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
        <div className="overflow-x-auto px-3">
            <table className="min-w-full border-collapse border border-slate-200 text-sm text-left">
                <thead>
                    <tr className="bg-slate-50 text-default">
                        <TableHeaderCell className="whitespace-nowrap">Fill Up</TableHeaderCell>
                        <TableHeaderCell className="text-green-700 whitespace-nowrap">Correct Answer</TableHeaderCell>
                        <TableHeaderCell className="text-primary-700 whitespace-nowrap">Your Answer</TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {qExtras.inputs.map((blank, i) => (
                        <tr key={blank.id} className="even:bg-surface">
                            <TableBodyCell className="whitespace-nowrap">Fill up {blank.id}</TableBodyCell>
                            <TableBodyCell>
                                <div>{MdQRenderer.fillBlanksText(correctAnswer?.answers[i].answer || "-")}</div>
                            </TableBodyCell>
                            <TableBodyCell>
                                <div dangerouslySetInnerHTML={{ __html: MdQRenderer.fillBlanksText(userAnswer?.answers[i].answer || "-") }} />
                            </TableBodyCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

type CellProps = {
    children: React.ReactNode;
    className?: string;
};


function TableHeaderCell({ children, className = "" }: CellProps) {
    return (
        <th className={`border border-slate-200 px-2 py-1 font-semibold ${className}`}>
            {children}
        </th>
    );
}

function TableBodyCell({ children, className = "" }: CellProps) {
    return (
        <td className={`border border-slate-200 px-2 py-1 text-default ${className}`}>
            {children}
        </td>
    );
}
