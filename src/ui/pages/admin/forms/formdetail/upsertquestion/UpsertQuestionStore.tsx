import { DataState } from "~/ui/utils/DataState";
import { UpsertQuestionVm } from "./models/UpsertQuestionVm"
import { makeObservable, observable, runInAction } from "mobx";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { QuestionPageStore } from "../questions/QuestionPageStore";
import { STT } from "~/infra/utils/stt/STT";
import { FValue } from "~/ui/widgets/form/FValue";
import { AppError } from "~/core/error/AppError";
import { UpsertQuestionReq, UpsertQuestionRes } from "~/domain/forms/admin/models/UpsertQuestionModel";
import { PmToHtml } from "~/ui/components/richpmeditor/utils/PmToHtml";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { Bool3 } from "~/core/utils/Bool3";
import { logger } from "~/core/utils/logger";
import { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";
import { withMinDelay } from "~/infra/utils/withMinDelay";
import { NumFmt } from "~/core/utils/NumFmt";
import { EnAVmFactory } from "./models/EnAVmFactory";

export type UpsertQuestionStoreProps = {
    id?: number;
    parentStore: QuestionPageStore;
    onClose: () => void;
    stt: STT;
}

export class UpsertQuestionStore {


    qvmState: DataState<UpsertQuestionVm> = DataState.init();
    saveState: DataState<void> = DataState.init();
    parentStore: QuestionPageStore;
    onClose: (res?: UpsertQuestionRes) => void;
    stt: STT;

    constructor(props: UpsertQuestionStoreProps) {
        this.parentStore = props.parentStore;
        this.onClose = props.onClose;
        this.stt = props.stt;
        makeObservable(this, {
            qvmState: observable.ref,
            saveState: observable.ref,
        });
        if (props.id) {
            this.loadQuestion();
        }
        else {
            this.resetState({});
        }
    }

    get vm() {
        return this.qvmState.data!;
    }

    async loadQuestion() {

    }

    get formType() {
        return this.parentStore.parentStore.fd.type;
    }

    get questionTypes(): readonly QuestionType[] {
        return QuestionType.getValues(this.formType);
    }


    onQuestionTypeChanged(type: QuestionType) {
        if (this.vm.id !== undefined) {
            // not allowed to change type of existing question
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
        await new Promise(resolve => setTimeout(resolve, 1000));

        const typeField = new FValue<QuestionType | null>(props.questionType || QuestionType.multipleChoice);
        const enaVm = EnAVmFactory.empty({
            type: typeField.value!,
            storeRef: this,
        });

        const scorable = new FValue<Bool3>(Bool3.N);
        const levelField = new FValue<QuestionLevel | null>(null);
        const marksField = new FValue<string>("");
        const canHaveMarks = QuestionType.canHaveMarks(this.fd.type, typeField.value!);
        const isRequired = new FValue<Bool3>(typeField.value!.isGroup ? Bool3.N : Bool3.F);


        if (canHaveMarks.isTrue) {
            scorable.set(Bool3.T);
            levelField.set(QuestionLevel.medium);
            marksField.set("1");
        }

        const vm = new UpsertQuestionVm({
            id: undefined,
            storeRef: this,
            type: typeField,
            enaVm: enaVm,
            scorable: scorable,
            level: levelField,
            marks: marksField,
            isRequired: isRequired,
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

    getAnsHint(): string | undefined {
        const ansHintContent = this.vm.ansHintRef.current?.getContent();
        if (!ansHintContent) {
            return undefined;
        }
        return PmToHtml.getContent(ansHintContent, blockSchema);
    }

    getAnsExplanation(): string | undefined {
        const ansExplanationContent = this.vm.ansExplanationRef.current?.getContent();
        if (!ansExplanationContent) {
            return undefined;
        }
        return PmToHtml.getContent(ansExplanationContent, blockSchema);
    }

    getQuestionText(): string {
        const questionTextContent = this.vm.questionTextRef.current?.getContent();
        if (!questionTextContent) {
            return "";
        }
        return PmToHtml.getContent(questionTextContent, blockSchema);
    }


    async saveQuestion() {
        if (this.saveState.isLoading) {
            return;
        }
        try {
            runInAction(() => {
                this.saveState = DataState.loading();
            });
            const req = new UpsertQuestionReq({
                formId: this.fd.id,
                id: this.vm.id,
                parentId: undefined,
                type: this.vm.type.value!,
                question: this.getQuestionText(),
                qExtras: this.vm.enaVm?.getQExtra() || null,
                answer: this.vm.enaVm?.getAnswer() || null,
                ansHint: this.getAnsHint(),
                level: this.vm.level.value || undefined,
                ansExplanation: this.getAnsExplanation(),
                marks: this.vm.scorable.value.isTrue ? (NumFmt.toNumber(this.vm.marks.value) ?? undefined) : undefined,
                isRequired: Bool3.T,
                isAiGenerated: Bool3.F,
            });
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


}