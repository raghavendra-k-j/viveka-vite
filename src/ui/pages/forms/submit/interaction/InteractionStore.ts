import { makeObservable, observable, runInAction } from "mobx";
import type { SubmitStore } from "../SubmitStore";
import { DataState } from "~/ui/utils/DataState";
import { AppError } from "~/core/error/AppError";
import { logger } from "~/core/utils/logger";
import type { FormType } from "~/domain/forms/models/FormType";
import { InteractionVm } from "./models/InteractionVm";
import { STT } from "~/infra/utils/stt/STT";
import { InstanceId } from "~/core/utils/InstanceId";
import { SubmitFormQuestion } from "~/domain/forms/models/SubmitFormQuestion";
import { GroupQuestionVm } from "./models/GroupQuestionVm";
import { SubmitFormReq, SubmitFormRes } from "~/domain/forms/models/submit/SubmitFormModels";

type InteractionStoreProps = {
    parentStore: SubmitStore;
};

export class InteractionStore {
    parentStore: SubmitStore;
    vmState: DataState<InteractionVm>;
    startedOn!: Date;
    endedOn: Date | null = null;
    remainingSeconds: number = 0;
    private timer: ReturnType<typeof setInterval> | null = null;
    public readonly instanceId = InstanceId.generate("InteractionStore");
    _stt!: STT;
    submitState = DataState.init<SubmitFormRes>();

    constructor(props: InteractionStoreProps) {
        logger.debug("Creating InteractionStore", this.instanceId);
        this.parentStore = props.parentStore;
        this.vmState = DataState.init<InteractionVm>();
        makeObservable(this, {
            vmState: observable.ref,
            remainingSeconds: observable,
            submitState: observable.ref,
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

    get selectedLanguageId() {
        return this.parentStore.selectedLanguage?.id;
    }


    async onClickSubmitForm() {
        this.stopTimer();
        this.endedOn = new Date();
        await this.submitDataToServer();
    }

    private async submitDataToServer() {
        try {
            const data = this.prepareDataToSubmit();
            const submitFormReq = new SubmitFormReq({
                formId: this.parentStore.formDetail.id,
                submittedLanguageId: this.selectedLanguageId!,
                startedOn: this.startedOn,
                endedOn: this.endedOn!,
                questions: data,
            });
            const res = (await this.parentStore.formService.submitForm(submitFormReq)).getOrError();
            runInAction(() => {
                this.submitState = DataState.data(res);
            });
        }
        catch (error) {
            logger.error("Error submitting form", error);
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.vmState = DataState.error(appError);
            });
        }
    }

    prepareDataToSubmit() {
        const submitQuestions: SubmitFormQuestion[] = [];
        for (const question of this.questions) {
            if (!question.base.type.isGroup) {
                // Non-group question: get answer directly
                const answer = question.getAnswer();
                if (answer) {
                    submitQuestions.push(new SubmitFormQuestion(question.base.id, answer));
                }
                continue;
            }

            const groupQuestion = question as GroupQuestionVm;
            const subQuestionAnswers: SubmitFormQuestion[] = [];
            for (const subQuestion of groupQuestion.subQuestions) {
                const answer = subQuestion.getAnswer?.();
                if (answer !== undefined) {
                    subQuestionAnswers.push(new SubmitFormQuestion(subQuestion.base.id, answer));
                }
            }
            if (subQuestionAnswers.length > 0) {
                submitQuestions.push(new SubmitFormQuestion(question.base.id, undefined, subQuestionAnswers));
            }
        }
        return submitQuestions;
    }




    dispose() {
        this.vmState.data?.dispose();
        this.stopTimer();
        this.stt.dispose();
        logger.debug("Disposed STT: ", this.stt.instanceId);
    }
}


