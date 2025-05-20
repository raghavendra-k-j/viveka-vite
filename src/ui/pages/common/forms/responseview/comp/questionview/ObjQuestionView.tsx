import {
    CheckBoxesQExtras,
    Choice,
    MultipleChoiceQExtras,
    TrueFalseQExtras
} from "~/domain/forms/models/question/QExtras";

import {
    CheckBoxesAnswer,
    MultipleChoiceAnswer,
    TrueFalseAnswer
} from "~/domain/forms/models/answer/Answer";

import { RDQuestionVm } from "../../models/QuestionVm";
import { ChoiceListView } from "./ChoiceList";

export type ObjQuestionViewProps = {
    question: RDQuestionVm;
};

export function ObjQuestionView({ question }: ObjQuestionViewProps) {
    let choices: Choice[] = [];
    let correctChoices: number[] | null = null;
    let selectedChoices: number[] = [];
    let isMultiSelect = false;

    if (question.type.isMultipleChoice) {
        const qExtras = question.qExtras as MultipleChoiceQExtras;
        choices = qExtras.choices;

        const answer = question.answer as MultipleChoiceAnswer | undefined;
        if (answer) {
            correctChoices = [answer.id];
        }

        const userAnswer = question.userAnswer as MultipleChoiceAnswer | undefined;
        if (userAnswer) {
            selectedChoices = [userAnswer.id];
        }
    }
    else if (question.type.isCheckBoxes) {
        const qExtras = question.qExtras as CheckBoxesQExtras;
        choices = qExtras.choices;

        const answer = question.answer as CheckBoxesAnswer | undefined;
        if (answer) {
            correctChoices = answer.ids ?? [];
        }

        const userAnswer = question.userAnswer as CheckBoxesAnswer | undefined;
        if (userAnswer) {
            selectedChoices = userAnswer.ids ?? [];
        }

        isMultiSelect = true;
    }
    else if (question.type.isTrueFalse) {
        const qExtras = question.qExtras as TrueFalseQExtras;
        choices = [];
        choices.push(new Choice({ id: 1, text: qExtras.trueLabel }));
        choices.push(new Choice({ id: 2, text: qExtras.falseLabel }));

        const answer = question.answer as TrueFalseAnswer | undefined;
        if (answer) {
            correctChoices = [answer.value ? 1 : 2];
        }

        const userAnswer = question.userAnswer as TrueFalseAnswer | undefined;
        if (userAnswer) {
            selectedChoices = [userAnswer.value ? 1 : 2];
        }
    }

    return (
        <ChoiceListView
            choices={choices}
            selectedChoices={selectedChoices}
            correctChoices={correctChoices}
            isMultiSelect={isMultiSelect}
        />
    );
}
