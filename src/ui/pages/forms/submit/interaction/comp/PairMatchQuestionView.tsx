import React from "react";
import { observer } from "mobx-react-lite";
import type { PairMatchQuestionVm } from "../models/PairMatchQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";
import { PairMatchRowText } from "~/ui/components/form/commons/QuestionText";

interface Props {
    vm: PairMatchQuestionVm;
    parentVm?: GroupQuestionVm;
}

export const PairMatchQuestionView: React.FC<Props> = observer(({ vm, parentVm }) => {
    const handleSelectionChange = (index: number, selectedRowId: number | null) => {
        vm.setSelectedRowIdForItem(index, selectedRowId);
    };

    return (
        <QuestionCardView parent={parentVm}>
            <QuestionHeaderView vm={vm} />
            <table className="w-full mt-4 border border-gray-300 text-sm rounded-md">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b border-gray-300">Column A</th>
                        <th className="p-3 border-b border-gray-300">Column B</th>
                    </tr>
                </thead>
                <tbody>
                    {vm.items.map((item, index) => (
                        <tr key={item.rowId} className="hover:bg-gray-50 transition">
                            <td className="p-3 align-top border-t border-gray-200">
                                <div className="text-gray-800"><PairMatchRowText text={item.colAText}/></div>
                            </td>
                            <td className="p-3 align-top border-t border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={item.selectedRowId ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleSelectionChange(index, value ? Number(value) : null);
                                        }}
                                    >
                                        <option value="">Select Correct Match</option>
                                        {vm.items.map(option => (
                                            <option key={option.rowId} value={option.rowId}>
                                                {option.colBText}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </QuestionCardView>
    );
});
