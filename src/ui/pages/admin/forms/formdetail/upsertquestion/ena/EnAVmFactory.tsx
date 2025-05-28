import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { EnAVm } from "./EnAVmBase";
import { ObjectiveEnAVm } from "./ObjectiveEnAVm";
import { TextEnAVm } from "./TextEnAVm";
import { FillBlankEnAVm } from "./FillBlankEnAVm";
import { PairMatchEnAVm } from "./PairMatchEnAVm";
import { Question } from "~/domain/forms/admin/models/Question";

export class EnAVmFactory {

    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): EnAVm | null {
        if (props.type.isTextBox || props.type.isTextArea) {
            return TextEnAVm.empty(props);
        }
        if (props.type.isMultipleChoice || props.type.isCheckBoxes || props.type.isTrueFalse) {
            return ObjectiveEnAVm.empty(props);
        }
        if (props.type.isFillBlank) {
            return FillBlankEnAVm.empty(props);
        }
        if (props.type.isPairMatch) {
            return PairMatchEnAVm.empty(props);
        }
        return null;
    }

    static fromQuestion({ question, storeRef }: { question: Question, storeRef: UpsertQuestionStore }): EnAVm | null {
        if (question.type.isTextBox || question.type.isTextArea) {
            return TextEnAVm.fromQuestion({ question, storeRef });
        }
        if (question.type.isMultipleChoice || question.type.isCheckBoxes || question.type.isTrueFalse) {
            return ObjectiveEnAVm.fromQuestion({ question, storeRef });
        }
        if (question.type.isFillBlank) {
            return FillBlankEnAVm.fromQuestion({ question, storeRef });
        }
        if (question.type.isPairMatch) {
            return PairMatchEnAVm.fromQuestion({ question, storeRef });
        }
        return null;
    }

}