import { RDQuestionVm } from "../../models/QuestionVm";
import { FillBlanksQExtras } from "~/domain/forms/models/question/QExtras";
import { FillBlanksAnswer } from "~/domain/forms/models/answer/Answer";
import { MdQRenderer } from "~/ui/components/form/commons/questionmarkit";

export type FillBlanksQuestionViewProps = {
    question: RDQuestionVm;
};

export function FillBlanksQuestionView({ question }: FillBlanksQuestionViewProps) {
    const qExtras = question.qExtras as FillBlanksQExtras;
    const correctAnswer = question.answer as FillBlanksAnswer;
    const userAnswer = question.userAnswer as FillBlanksAnswer | undefined;

    return (
        <div className="bg-slate-50 rounded-sm border border-default divide-y divide-default">
            {qExtras.inputs.map((blank, i) => {
                const correctAnswerStr = correctAnswer.answers?.[i]?.answer || "-";
                const userAnswerStr = userAnswer?.answers?.[i]?.answer || "-";

                return (
                    <div key={blank.id} className="px-3 py-4 first:pt-3 last:pb-3">
                        <div className="text-sm font-semibold mb-2">Fill up {i + 1}</div>

                        <div className="text-sm mb-1 flex flex-col gap-1">
                            <span className="font-semibold text-green-700">Correct Answer:</span>{" "}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: MdQRenderer.fillBlanksText(correctAnswerStr),
                                }}
                            />
                        </div>

                        <div className="text-sm flex flex-col gap-1">
                            <span className="font-semibold text-primary-700">Your Answer:</span>{" "}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: MdQRenderer.fillBlanksText(userAnswerStr),
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
