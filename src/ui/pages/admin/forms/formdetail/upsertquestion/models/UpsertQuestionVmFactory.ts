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
import { Node as ProseMirrorNode } from "prosemirror-model";

export class UpsertQuestionVmFactory {


    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): UpsertQuestionVm {
        const formType = props.storeRef.formType;
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
        const level = new FValue<QuestionLevel | null>(null);
        const marks = new FValue<string>("");
        const ansHintNode = null;
        const ansExplanationNode = null;
        const scorable = new FValue<Bool3>(Bool3.N);

        if (formType.isAssessment) {
            const marksPolicy = questionType.assmntMarksPolicy;
            if (marksPolicy.isRequired || marksPolicy.isOptional) {
                marks.set("1");
                level.set(QuestionLevel.medium);
                scorable.set(Bool3.T);
            }
        }

        return new UpsertQuestionVm({
            id: null,
            storeRef: props.storeRef,
            type: typeField,
            questionNode: null,
            enaVm: enaVm,
            questionOptions: questionOptions,
            scorable: scorable,
            level: level,
            marks: marks,
            ansHintNode: ansHintNode,
            ansExplanationNode: ansExplanationNode,
            isRequired: requiredField,
        });
    }

    static fromQuestion(props: { question: Question, storeRef: UpsertQuestionStore }): UpsertQuestionVm {
        const formType = props.storeRef.formType;
        const questionType = props.question.type;

        const typeField = new FValue<QuestionType | null>(questionType);
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

        const scorable = new FValue<Bool3>(Bool3.N);
        const marksField = new FValue<string>("");
        const level = new FValue<QuestionLevel | null>(null);
        let ansHintNode: ProseMirrorNode | null = null;
        let ansExplanationNode: ProseMirrorNode | null = null;

        if (formType.isAssessment) {
            const marksPolicy = questionType.assmntMarksPolicy;
            if (marksPolicy.isRequired || marksPolicy.isOptional) {
                if (props.question.marks) {
                    marksField.set(props.question.marks.toString());
                    level.set(props.question.level);
                    ansExplanationNode = PmConverter.toNodeOrEmpty({
                        text: props.question.ansExplanation,
                        schema: blockSchema,
                    });
                    ansHintNode = PmConverter.toNodeOrEmpty({
                        text: props.question.ansHint,
                        schema: blockSchema,
                    });
                }
            }
            else {
                scorable.set(Bool3.N);
            }
        }
        const isRequired = new FValue<Bool3>(props.question.isRequired);
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