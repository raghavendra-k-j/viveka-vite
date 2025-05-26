import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { UpsertQuestionVm } from "./UpsertQuestionVm";
import { FValue } from "~/ui/widgets/form/FValue";
import { Question } from "~/domain/forms/admin/models/Question";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";

export class UpsertQuestionVmFactory {


    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): UpsertQuestionVm {
        const typeField = new FValue<QuestionType | null>(props.type);
        return new UpsertQuestionVm({
            id: null,
            storeRef: props.storeRef,
            type: typeField,
            questionNode: null,
        });
    }

    static fromQuestion(props: { question: Question, storeRef: UpsertQuestionStore }): UpsertQuestionVm {
        const typeField = new FValue<QuestionType | null>(props.question.type);
        const questionNode = PmConverter.toNode({
            text: props.question.question,
            schema: blockSchema,
        });
        return new UpsertQuestionVm({
            id: props.question.id,
            storeRef: props.storeRef,
            type: typeField,
            questionNode: questionNode,
        });
    }
}