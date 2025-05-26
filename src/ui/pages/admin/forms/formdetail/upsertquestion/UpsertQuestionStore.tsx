import { DataState } from "~/ui/utils/DataState";
import { UpsertQuestionVm } from "./models/UpsertQuestionVm"
import { makeObservable, observable, runInAction } from "mobx";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { STT } from "~/infra/utils/stt/STT";
import { AppError } from "~/core/error/AppError";
import { UpsertQuestionReq, UpsertQuestionRes } from "~/domain/forms/admin/models/UpsertQuestionModel";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { logger } from "~/core/utils/logger";
import { withMinDelay } from "~/infra/utils/withMinDelay";
import { NumFmt } from "~/core/utils/NumFmt";
import { GetQuestionRes } from "~/domain/forms/admin/models/GetQuestionRes";
import { UpsertQuestionVmFactory } from "./models/UpsertQuestionVmFactory";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { waitForNextFrame } from "~/infra/utils/waitForNextFrame";
import { AdminFormsService } from "~/domain/forms/admin/services/AdminFormsService";
import { FormType } from "~/domain/forms/models/FormType";
import { ThingId } from "~/core/utils/ThingId";
import { showAppErrorDialog } from "~/ui/components/dialogs/showAppErrorDialog";
import { DialogManagerStore } from "~/ui/widgets/dialogmanager";

export type UpsertQuestionStoreProps = {
    id: number | null;
    parentId: number | null;
    formId: number;
    formType: FormType;
    stt: STT;
    adminFormsService: AdminFormsService;
    onClose: () => void;
    dialogManager: DialogManagerStore;
}

export class UpsertQuestionStore {
    instanceId = ThingId.generate();

    id: number | null;
    parentId: number | null;
    formId: number;
    formType: FormType;
    stt: STT;
    adminFormsService: AdminFormsService;
    onClose: (res?: UpsertQuestionRes) => void;

    qvmState: DataState<UpsertQuestionVm> = DataState.init();
    saveState: DataState<void> = DataState.init();
    dialogManager: DialogManagerStore;

    constructor(props: UpsertQuestionStoreProps) {
        this.id = props.id;
        this.parentId = props.parentId;
        this.onClose = props.onClose;
        this.stt = props.stt;
        this.adminFormsService = props.adminFormsService;
        this.formType = props.formType;
        this.formId = props.formId;
        this.dialogManager = props.dialogManager;
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
            await this.loadNewEmptyQuestion({});
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
        this.loadNewEmptyQuestion({
            questionType: type,
        });
    }


    async loadNewEmptyQuestion(props: { questionType?: QuestionType }) {
        runInAction(() => {
            this.qvmState = DataState.loading();
        });
        const vm = UpsertQuestionVmFactory.empty({
            type: props.questionType || this.questionTypes[0],
            storeRef: this,
        });
        runInAction(() => {
            this.qvmState = DataState.data(vm);
        });
    }

    private getAnsHint(): string | null {
        return PmConverter.toTextFromRef({
            ref: this.vm.ansHintRef,
            schema: blockSchema,
        });
    }

    private getAnsExplanation(): string | null {
        return PmConverter.toTextFromRef({
            ref: this.vm.ansExplanationRef,
            schema: blockSchema,
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
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.saveState = DataState.error(appError);
            });
            showAppErrorDialog({
                dialogManager: this.dialogManager,
                dialogId: "upsert-question-error",
                appError: appError,
                primaryButton: {
                    text: "OK",
                    onClick: () => {
                        this.dialogManager.closeById("upsert-question-error");
                    },
                },
            });
        }
    }


    private getRequest() {
        const req = new UpsertQuestionReq({
            formId: this.formId,
            id: this.vm.id,
            parentId: this.parentId,
            type: this.vm.type.value!,
            question: this.qvmState.data?.getQuestionText() ?? "",
            qExtras: this.vm.enaVm?.getQExtra() || null,
            answer: this.vm.enaVm?.getAnswer() || null,
            ansHint: this.getAnsHint(),
            level: this.vm.level.value,
            ansExplanation: this.getAnsExplanation(),
            marks: this.vm.scorable.value.isTrue ? (NumFmt.toNumber(this.vm.marks.value) ?? null) : null,
            isRequired: this.vm.isRequired.value,
            mediaRefs: [],
        });
        return req;
    }

}