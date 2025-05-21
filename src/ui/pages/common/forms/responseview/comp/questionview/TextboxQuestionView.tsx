import { TextBoxAnswer, TextAreaAnswer } from "~/domain/forms/models/answer/Answer";
import { RDQuestionVm } from "../../models/QuestionVm";
import { MdQRenderer } from "~/ui/components/form/commons/questionmarkit";

export type TextQuestionViewProps = {
    question: RDQuestionVm;
};

export function TextQuestionView({ question }: TextQuestionViewProps) {
    const isTextBox = question.type.isTextBox;
    const userAnswer = question.userAnswer as TextBoxAnswer | TextAreaAnswer | undefined;
    const correctAnswer = question.answer as TextBoxAnswer | TextAreaAnswer | undefined;

    return (
        <div className="text-default text-sm flex flex-col px-3 py-2 gap-4">
            {correctAnswer?.answer && (
                <AnswerSection
                    prefix="Correct Answer:"
                    text={correctAnswer.answer}
                    isTextArea={!isTextBox}
                    colorClass="text-green-800"
                />
            )}
            <AnswerSection
                prefix="Your Answer:"
                text={userAnswer?.answer}
                isTextArea={!isTextBox}
                colorClass="text-primary-700"
            />
        </div>
    );
}

function AnswerSection({
    prefix,
    text,
    colorClass,
}: {
    prefix: string;
    text?: string;
    isTextArea: boolean;
    colorClass: string;
}) {
    return (
        <div>
            <div className={`text-sm font-semibold ${colorClass}`}>{prefix}</div>
            {text && <div dangerouslySetInnerHTML={{ __html: MdQRenderer.textAnswer(text) }}></div>}
        </div>
    );
}
