import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { UpsertQuestionVm } from "./UpsertQuestionVm";
import { FValue } from "~/ui/widgets/form/FValue";
import { EnAVmFactory } from "../ena/EnAVmFactory";
import { Bool3 } from "~/core/utils/Bool3";
import { QuestionOptions } from "../ena/QuestionOptions";
import { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";
import { Question } from "~/domain/forms/admin/models/Question";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";

export class UpsertQuestionVmFactory {


    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): UpsertQuestionVm {
        const formType = props.storeRef.fd.type;
        const questionType = props.type;
        const typeField = new FValue<QuestionType | null>(props.type);
        const enaVm = EnAVmFactory.empty({
            type: typeField.value!,
            storeRef: props.storeRef,
        });
        const questionOptions = QuestionOptions.empty({
            storeRef: props.storeRef,
            type: typeField.value!,
        });
        const requiredField = new FValue<Bool3>(props.type.isGroup ? Bool3.N : Bool3.F);
        if (props.storeRef.fd.type.isAssessment) {
            const scorable = new FValue<Bool3>(QuestionType.canHaveMarks(formType, questionType));
            return new UpsertQuestionVm({
                id: null,
                storeRef: props.storeRef,
                type: typeField,
                questionNode: null,
                enaVm: enaVm,
                questionOptions: questionOptions,
                scorable: scorable,
                level: new FValue<QuestionLevel | null>(QuestionLevel.medium),
                marks: new FValue<string>("1"),
                ansHintNode: null,
                ansExplanationNode: null,
                isRequired: requiredField,
            });
        }
        else {
            return new UpsertQuestionVm({
                id: null,
                storeRef: props.storeRef,
                type: typeField,
                questionNode: null,
                enaVm: enaVm,
                questionOptions: questionOptions,
                scorable: new FValue<Bool3>(Bool3.N),
                level: new FValue<QuestionLevel | null>(null),
                marks: new FValue<string>(""),
                isRequired: requiredField,
                ansHintNode: null,
                ansExplanationNode: null,
            });
        }
    }

    static fromQuestion(props: { question: Question, storeRef: UpsertQuestionStore }): UpsertQuestionVm {
        const scorable = new FValue<Bool3>(Bool3.N);
        const canHaveMarks = QuestionType.canHaveMarks(props.storeRef.fd.type, props.question.type);
        const marksField = new FValue<string>("");
        const level = new FValue<QuestionLevel | null>(null);
        const ansHintNode = props.question.ansHint ? PmConverter.toNode({
            text: props.question.ansHint,
            schema: blockSchema,
        }) : null;
        const ansExplanationNode = props.question.ansExplanation ? PmConverter.toNode({
            text: props.question.ansExplanation,
            schema: blockSchema,
        }) : null;

        const isRequired = new FValue<Bool3>(props.question.isRequired);

        if (canHaveMarks.isTrue) {
            scorable.set(props.question.marks ? Bool3.T : Bool3.F);
            marksField.set(props.question.marks ? props.question.marks.toString() : "");
            level.set(props.question.level);
        }
        const typeField = new FValue<QuestionType | null>(props.question.type);
        const enaVm = EnAVmFactory.fromQuestion({
            question: props.question,
            storeRef: props.storeRef,
        });
        const questionOptions = QuestionOptions.fromQuestion({
            question: props.question,
            storeRef: props.storeRef,
        });

        const questionNode = PmConverter.toNode({
            text: props.question.question,
            schema: blockSchema,
        });

        return new UpsertQuestionVm({
            id: props.question.id,
            storeRef: props.storeRef,
            type: typeField,
            questionNode: questionNode,
            enaVm: enaVm,
            questionOptions: questionOptions,
            scorable: scorable,
            level: level,
            marks: marksField,
            ansHintNode: ansHintNode,
            ansExplanationNode: ansExplanationNode,
            isRequired: isRequired,
        });
    }
}