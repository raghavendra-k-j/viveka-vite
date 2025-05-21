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
            correctChoices = [answer.id - 1];
        }

        const userAnswer = question.userAnswer as MultipleChoiceAnswer | undefined;
        if (userAnswer) {
            selectedChoices = [userAnswer.id - 1];
        }
    }
    else if (question.type.isCheckBoxes) {
        const qExtras = question.qExtras as CheckBoxesQExtras;
        choices = qExtras.choices;

        const answer = question.answer as CheckBoxesAnswer | undefined;
        if (answer) {
            // correctChoices = answer.ids ?? [];
            correctChoices = answer.ids?.map((id) => id - 1) ?? [];
        }

        const userAnswer = question.userAnswer as CheckBoxesAnswer | undefined;
        if (userAnswer) {
            // selectedChoices = userAnswer.ids ?? [];
            selectedChoices = userAnswer.ids?.map((id) => id - 1) ?? [];
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
            // correctChoices = [answer.value ? 1 : 2];
            correctChoices = [answer.value ? 0 : 1];
        }

        const userAnswer = question.userAnswer as TrueFalseAnswer | undefined;
        if (userAnswer) {
            // selectedChoices = [userAnswer.value ? 1 : 2];
            selectedChoices = [userAnswer.value ? 0 : 1];
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
