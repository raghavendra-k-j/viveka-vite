import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { EnAVm } from "./EnAVmBase";
import { ObjectiveEnAVm } from "./ObjectiveEnAVm";
import { TextEnAVm } from "./TextEnAVm";

export class EnAVmFactory {
    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): EnAVm | null {
        if (props.type.isTextBox || props.type.isTextArea) {
            return TextEnAVm.empty(props);
        } else if (props.type.isMultipleChoice || props.type.isCheckBoxes) {
            return ObjectiveEnAVm.empty(props);
        } else {
            return null;
        }
    }
}