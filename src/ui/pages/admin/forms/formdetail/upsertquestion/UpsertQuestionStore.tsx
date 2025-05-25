import { DataState } from "~/ui/utils/DataState";
import { UpsertQuestionVm } from "./models/UpsertQuestionVm"
import { makeObservable, observable, runInAction } from "mobx";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { QuestionPageStore } from "../questions/QuestionPageStore";
import { STT } from "~/infra/utils/stt/STT";
import { AppError } from "~/core/error/AppError";
import { UpsertQuestionReq, UpsertQuestionRes } from "~/domain/forms/admin/models/UpsertQuestionModel";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { Bool3 } from "~/core/utils/Bool3";
import { logger } from "~/core/utils/logger";
import { withMinDelay } from "~/infra/utils/withMinDelay";
import { NumFmt } from "~/core/utils/NumFmt";
import { GetQuestionRes } from "~/domain/forms/admin/models/GetQuestionRes";
import { UpsertQuestionVmFactory } from "./models/UpsertQuestionVmFactory";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";

export type UpsertQuestionStoreProps = {
    id: number | null;
    parentId: number | null;
    parentStore: QuestionPageStore;
    onClose: () => void;
    stt: STT;
}

export class UpsertQuestionStore {
    id: number | null;
    parentId: number | null;
    qvmState: DataState<UpsertQuestionVm> = DataState.init();
    saveState: DataState<void> = DataState.init();
    parentStore: QuestionPageStore;
    onClose: (res?: UpsertQuestionRes) => void;
    stt: STT;

    constructor(props: UpsertQuestionStoreProps) {
        this.id = props.id;
        this.parentId = props.parentId;
        this.parentStore = props.parentStore;
        this.onClose = props.onClose;
        this.stt = props.stt;
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
            this.loadQuestionById(this.id);
        }
        else {
            this.resetState({});
        }
    }

    async loadQuestionById(id: number) {
        try {
            runInAction(() => {
                this.qvmState = DataState.loading();
            });
            const res = await withMinDelay(
                this.parentStore.parentStore.adminFormService.getQuestionById({
                    formId: this.fd.id,
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


    get formType() {
        return this.parentStore.parentStore.fd.type;
    }

    get questionTypes(): readonly QuestionType[] {
        return QuestionType.getValues(this.formType);
    }


    onQuestionTypeChanged(type: QuestionType) {
        if(this.vm.id !== null) {
            logger.warn("Cannot change question type for an existing question");
            return;
        }
        this.vm.type.set(type);
        this.resetState({
            questionType: type,
        });
    }


    async resetState(props: { questionType?: QuestionType }) {
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

    get adminFormService() {
        return this.parentStore.parentStore.adminFormService;
    }

    get fd() {
        return this.parentStore.parentStore.fd;
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

    private getQuestionText(): string {
        return PmConverter.toTextFromRef({
            ref: this.vm.questionTextRef,
            schema: blockSchema,
        }) || "";
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
            const res = (await withMinDelay(this.adminFormService.upsertQuestion(req))).getOrError();
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
        const req = new UpsertQuestionReq({
            formId: this.fd.id,
            id: this.vm.id,
            parentId: this.parentId,
            type: this.vm.type.value!,
            question: this.getQuestionText(),
            qExtras: this.vm.enaVm?.getQExtra() || null,
            answer: this.vm.enaVm?.getAnswer() || null,
            ansHint: this.getAnsHint(),
            level: this.vm.level.value,
            ansExplanation: this.getAnsExplanation(),
            marks: this.vm.scorable.value.isTrue ? (NumFmt.toNumber(this.vm.marks.value) ?? null) : null,
            isRequired: Bool3.T,
            mediaRefs: [],
        });
        return req;
    }

}