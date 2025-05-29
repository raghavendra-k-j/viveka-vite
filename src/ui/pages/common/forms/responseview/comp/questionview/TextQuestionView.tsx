import { TextBoxAnswer, TextAreaAnswer } from "~/domain/forms/models/answer/Answer";
import { RDQuestionVm } from "../../models/QuestionVm";
import { MdQRenderer } from "~/ui/components/form/commons/questionmarkit";
import { TextAnswerSection } from "./TextAnswerSection";

export type TextQuestionViewProps = {
    question: RDQuestionVm;
};

export function TextQuestionView({ question }: TextQuestionViewProps) {
    const isTextBox = question.type.isTextBox;
    const userAnswer = question.userAnswer as TextBoxAnswer | TextAreaAnswer | undefined;
    const correctAnswer = question.answer as TextBoxAnswer | TextAreaAnswer | undefined;

    return (
        <div className="text-default text-base-sm flex flex-col gap-2">
            {correctAnswer?.answer && (
                <TextAnswerSection
                    prefix="Correct Answer:"
                    text={correctAnswer.answer}
                    isTextArea={!isTextBox}
                    colorClass="text-green-800"
                />
            )}
            <TextAnswerSection
                prefix="Your Answer:"
                text={userAnswer?.answer}
                isTextArea={!isTextBox}
                colorClass="text-primary-700"
            />
        </div>
    );
}

