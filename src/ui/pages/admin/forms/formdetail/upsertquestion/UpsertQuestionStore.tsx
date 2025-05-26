import { DataState } from "~/ui/utils/DataState";
import { UpsertQuestionVm } from "./models/UpsertQuestionVm"
import { makeObservable, observable, runInAction } from "mobx";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { STT } from "~/infra/utils/stt/STT";
import { AppError } from "~/core/error/AppError";
import { UpsertQuestionRes } from "~/domain/forms/admin/models/UpsertQuestionModel";
import { logger } from "~/core/utils/logger";
import { mockDelay, withMinDelay } from "~/infra/utils/withMinDelay";
import { GetQuestionRes } from "~/domain/forms/admin/models/GetQuestionRes";
import { UpsertQuestionVmFactory } from "./models/UpsertQuestionVmFactory";
import { waitForNextFrame } from "~/infra/utils/waitForNextFrame";
import { InstanceId } from "~/core/utils/InstanceId";
import { AdminFormsService } from "~/domain/forms/admin/services/AdminFormsService";
import { FormType } from "~/domain/forms/models/FormType";

export type UpsertQuestionStoreProps = {
    id: number | null;
    parentId: number | null;
    formId: number;
    formType: FormType;
    stt: STT;
    adminFormsService: AdminFormsService;
    onClose: () => void;
}

export class UpsertQuestionStore {
    instanceId = InstanceId.generate("UpsertQuestionStore");

    id: number | null;
    parentId: number | null;
    formId: number;
    formType: FormType;
    stt: STT;
    adminFormsService: AdminFormsService;
    onClose: (res?: UpsertQuestionRes) => void;

    qvmState: DataState<UpsertQuestionVm> = DataState.init();
    saveState: DataState<void> = DataState.init();

    constructor(props: UpsertQuestionStoreProps) {
        this.id = props.id;
        this.parentId = props.parentId;
        this.onClose = props.onClose;
        this.stt = props.stt;
        this.adminFormsService = props.adminFormsService;
        this.formType = props.formType;
        this.formId = props.formId;
        makeObservable(this, {
            qvmState: observable.ref,
            saveState: observable.ref,
        });
    }

    get vm() {
        return this.qvmState.data!;
    }

    get isEdit() {
        return this.id !== null;
    }

    async loadQuestion() {
        if (this.id !== null) {
            await this.loadQuestionById(this.id);
        }
        else {
            await this.resetState({});
        }
    }

    async loadQuestionById(id: number) {
        try {
            runInAction(() => {
                this.qvmState = DataState.loading();
            });
            await waitForNextFrame();
            const res = await withMinDelay(
                this.adminFormsService.getQuestionById({
                    formId: this.formId,
                    questionId: id,
                })
            );
            const question = res.getOrError();
            this.onQuestionLoaded(question);
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            logger.error("Error while loading question", appError);
            runInAction(() => {
                this.qvmState = DataState.error(appError);
            });
        }
    }


    onQuestionLoaded(res: GetQuestionRes) {
        const question = res.question;
        const vm = UpsertQuestionVmFactory.fromQuestion({
            question: question,
            storeRef: this,
        });
        runInAction(() => {
            this.qvmState = DataState.data(vm);
        });
    }

    get questionTypes(): readonly QuestionType[] {
        return QuestionType.getValues(this.formType);
    }


    onQuestionTypeChanged(type: QuestionType) {
        if (this.vm.id !== null) {
            logger.warn("Cannot change question type for an existing question");
            return;
        }
        this.resetState({
            questionType: type,
        });
    }


    async resetState(props: { questionType?: QuestionType }) {
        logger.info("Resetting question state", props);
        runInAction(() => {
            this.qvmState = DataState.loading();
        });
        await waitForNextFrame();
        await mockDelay(1000);
        const vm = UpsertQuestionVmFactory.empty({
            type: props.questionType || this.questionTypes[0],
            storeRef: this,
        });
        runInAction(() => {
            this.qvmState = DataState.data(vm);
        });
    }

    async saveQuestion() {
        if (this.saveState.isLoading) {
            return;
        }
        try {
            runInAction(() => {
                this.saveState = DataState.loading();
            });
            const req = this.getRequest();
            const res = (await this.adminFormsService.upsertQuestion(req)).getOrError();
            runInAction(() => {
                this.saveState = DataState.data(undefined);
                this.onClose(res);
            });
        }
        catch (error) {
            logger.error("Error while saving question", error);
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.saveState = DataState.error(appError);
            });
        }
    }


    private getRequest() {
        return null!;
    }

}