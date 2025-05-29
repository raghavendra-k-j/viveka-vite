import type { Question } from "~/domain/forms/models/question/Question";
import type { InteractionVm } from "./InteractionVm";
import { GroupQuestionVm } from "./GroupQuestionVm";
import type { QuestionVm } from "./QuestionVm";
import { ObjectiveQuestionVm } from "./ObjectiveQuestionVm";
import { TextQuestionVm } from "./TextQuestionVm";
import { FillBlanksQuestionVm } from "./FillBlanksQuestionVm";
import { PairMatchQuestionVm } from "./PairMatchQuestionVm";

export class QuestionVmFactory {

    static create({ question, store }: { question: Question, store: InteractionVm }): QuestionVm {
        const type = question.type;
        if (type.isObjective || type.isTrueFalse) {
            const objectiveQuestion = new ObjectiveQuestionVm({ question: question, store: store });
            return objectiveQuestion;
        }
        if (type.isTextBox) {
            const textboxQuestion = new TextQuestionVm({ question: question, store: store });
            return textboxQuestion;
        }
        if (type.isTextArea) {
            const textAreadQuestion = new TextQuestionVm({ question: question, store: store });
            return textAreadQuestion;
        }
        if (type.isFillBlank) {
            const fillBlanksQuestion = new FillBlanksQuestionVm({ question: question, store: store });
            return fillBlanksQuestion;
        }
        if (type.isPairMatch) {
            const pairMatchQuestion = new PairMatchQuestionVm({ question: question, store: store });
            return pairMatchQuestion;
        }
        if (type.isGroup) {
            const groupQuestion = new GroupQuestionVm({ question: question, store: store });
            return groupQuestion;
        }
        else {
            throw new Error(`Unknown question type: ${type}`);
        }
    }

}