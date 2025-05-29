import React from "react";
import { RDQuestionVm } from "../../models/QuestionVm";
import { PairMatchQExtras, PairMatchItem } from "~/domain/forms/models/question/QExtras";
import { PairMatchAnswer } from "~/domain/forms/models/answer/Answer";
import { MdQRenderer } from "~/ui/components/form/commons/questionmarkit";

export type PairMatchQuestionViewProps = {
    question: RDQuestionVm;
};

export function PairMatchQuestionView({ question }: PairMatchQuestionViewProps) {
    const qExtras = question.qExtras as PairMatchQExtras;
    const correctAnswer = question.answer as PairMatchAnswer;
    const userAnswer = question.userAnswer as PairMatchAnswer | undefined;

    // Map rowId to PairMatchItem
    const itemMap: Record<number, PairMatchItem> = {};
    qExtras.items.forEach((item) => {
        itemMap[item.rowId] = item;
    });

    // Maps for correct and user matched answers (colBText)
    const correctAnswerMap: Record<number, string> = {};
    correctAnswer.answers.forEach((ans) => {
        correctAnswerMap[ans.rowId] = itemMap[ans.correctRowId]?.colBText ?? "-";
    });

    const userAnswerMap: Record<number, string> = {};
    userAnswer?.answers.forEach((ans) => {
        userAnswerMap[ans.rowId] = itemMap[ans.correctRowId]?.colBText ?? "-";
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-default text-sm text-left">
                <thead>
                    <tr className="bg-slate-50 text-default">
                        <TableHeaderCell className="whitespace-nowrap">Column A</TableHeaderCell>
                        <TableHeaderCell className="text-green-700 whitespace-nowrap">Correct Answer</TableHeaderCell>
                        <TableHeaderCell className="text-primary-700 whitespace-nowrap">Your Answer</TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {qExtras.items.map((item) => (
                        <tr key={item.rowId}>
                            <TableBodyCell>
                                <div
                                    dangerouslySetInnerHTML={{ __html: MdQRenderer.pairMatchText(item.colAText) }}
                                    className="whitespace-nowrap" // allow normal wrapping for content if needed
                                ></div>
                            </TableBodyCell>
                            <TableBodyCell>
                                <div
                                    dangerouslySetInnerHTML={{ __html: MdQRenderer.pairMatchText(correctAnswerMap[item.rowId] || "-") }}
                                    className="whitespace-nowrap"
                                ></div>
                            </TableBodyCell>
                            <TableBodyCell>
                                <div
                                    dangerouslySetInnerHTML={{ __html: MdQRenderer.pairMatchText(userAnswerMap[item.rowId] || "-") }}
                                    className="whitespace-nowrap"
                                ></div>
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
        <th className={`border border-default px-2 py-1 font-semibold ${className}`}>
            {children}
        </th>
    );
}

function TableBodyCell({ children, className = "" }: CellProps) {
    return (
        <td className={`border border-default px-2 py-1 ${className}`}>
            {children}
        </td>
    );
}
