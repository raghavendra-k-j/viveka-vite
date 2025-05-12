import { makeObservable, observable, runInAction } from "mobx";
import type { SubmitStore } from "../SubmitStore";
import { DataState } from "~/ui/utils/DataState";
import { AppError } from "~/core/error/AppError";
import { logger } from "~/core/utils/logger";
import type { FormType } from "~/domain/forms/models/FormType";
import { InteractionVm } from "./models/InteractionVm";
import { STT } from "~/infra/utils/stt/STT";
import { InstanceId } from "~/core/utils/InstanceId";

type InteractionStoreProps = {
    parentStore: SubmitStore;
};

export class InteractionStore {

    parentStore: SubmitStore;
    vmState: DataState<InteractionVm>;
    startedOn!: Date;
    remainingSeconds: number = 0;
    private timer: ReturnType<typeof setInterval> | null = null;
    public readonly instanceId = InstanceId.generate("InteractionStore");
    _stt!: STT;

    constructor(props: InteractionStoreProps) {
        logger.debug("Creating InteractionStore", this.instanceId);
        this.parentStore = props.parentStore;
        this.vmState = DataState.init<InteractionVm>();
        makeObservable(this, {
            vmState: observable.ref,
            remainingSeconds: observable,
        });
        this.loadQuestions();
    }

    get stt(): STT {
        if (!this._stt) {
            throw new Error("STT is not initialized");
        }
        return this._stt;
    }

    set stt(stt: STT) {
        this._stt = stt;
    }


    get vm(): InteractionVm {
        return this.vmState.data!;
    }

    get formType(): FormType {
        return this.parentStore.formDetail.type;
    }

    get formDetail() {
        return this.parentStore.formDetail;
    }

    get questions() {
        return this.vm.questions;
    }

    get hasTimeLimit() {
        return this.formDetail.hasTimeLimit;
    }

    async loadQuestions() {
        runInAction(() => {
            this.vmState = DataState.loading();
        });
        try {
            const res = await this.parentStore.formService.getQuestions({
                formId: this.parentStore.formDetail.id,
                languageId: this.parentStore.selectedLanguage?.id,
            });
            if (res.isError) throw res.error;

            this.vmState?.data?.dispose();
            const interactionVm = new InteractionVm({
                questionRes: res.data,
                parentStore: this,
            });

            runInAction(() => {
                this.vmState = DataState.data(interactionVm);
            });

            this.startForm();
        } catch (error) {
            logger.error("Error loading questions", error);
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.vmState = DataState.error(appError);
            });
        }
    }

    private startForm() {
        this.startedOn = new Date();
        this.startTimerIfNeeded();
    }

    private startTimerIfNeeded() {
        if (!this.hasTimeLimit) return;
        runInAction(() => {
            this.remainingSeconds = this.formDetail.timeLimit!;
        });

        this.timer = setInterval(() => {
            runInAction(() => {
                this.remainingSeconds -= 1;
            });

            if (this.remainingSeconds <= 0) {
                this.stopTimer();
                this.onTimerCompleted();
            }
        }, 1000);
    }

    private stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    onTimerCompleted() {
        console.log("Time is up.");
    }

    dispose() {
        this.vmState.data?.dispose();
        this.stopTimer();
        this.stt.dispose();
        logger.debug("Disposed STT: ", this.stt.instanceId);
    }
}
