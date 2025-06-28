import { Observer } from "mobx-react-lite";
import { PairMatchEnAVm } from "./PairMatchEnAVm";
import { PairMatchItemVm } from "./PairMatchItemVm";
import React from "react";
import { FInput } from "~/ui/widgets/form/input/FInput";
import { FSelect } from "~/ui/widgets/form/input/FSelect";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { Trash2 } from "lucide-react";

export function PairMatchEnAView(vm: PairMatchEnAVm) {
    return (
        <div className="overflow-x-auto">
            <PairMatchTable vm={vm} />
            <div className="mt-2 flex justify-end">
                <OutlinedButton size="sm" onClick={() => vm.addRow()}>
                    Add Row
                </OutlinedButton>
            </div>
        </div>
    );
}

function PairMatchTable({ vm }: { vm: PairMatchEnAVm }) {
    return (
        <table className="min-w-full border border-secondary rounded-md">
            <TableHeader />
            <tbody>
                <Observer>
                    {() => (
                        <>
                            {vm.items.map((item) => (
                                <PairMatchRowItem
                                    key={item.rowUid}
                                    vm={vm}
                                    item={item}
                                    onRemove={() => vm.removeRow(item)}
                                />
                            ))}
                        </>
                    )}
                </Observer>
            </tbody>
        </table>
    );
}

function TableHeader() {
    const headers = ["#", "Column A", "Column B", "Correct Match", "Action"];
    return (
        <thead className="bg-gray-100">
            <tr>
                {headers.map((title) => (
                    <th
                        key={title}
                        className="px-3 py-2 border border-default text-left text-xs font-medium"
                    >
                        {title}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

type PairMatchRowItemProps = {
    vm: PairMatchEnAVm;
    item: PairMatchItemVm;
    onRemove: () => void;
};

function PairMatchRowItem({ item, vm, onRemove }: PairMatchRowItemProps) {
    const rowIndex = vm.items.findIndex((i) => i.rowUid === item.rowUid) + 1;

    return (
        <tr>
            <td className="border border-default px-3 py-2 text-center w-10">{rowIndex}</td>
            <Observer>
                {() => <ColumnInputCell value={item.colAText} refObj={item.colARef} onChange={(e) => item.onColATextChange(e)} />}
            </Observer>
            <Observer>
                {() => <ColumnInputCell value={item.colBText} refObj={item.colBRef} onChange={(e) => item.onColBTextChange(e)} />}
            </Observer>
            <CorrectMatchSelect vm={vm} item={item} />
            <td className="border border-default px-3 py-2 text-center">
                <RemoveRowButton onRemove={() => onRemove()} />
            </td>
        </tr>
    );
}

type ColumnInputCellProps = {
    value: string;
    refObj: React.RefObject<HTMLInputElement | null>;
    onChange: (text: string) => void;
};

function ColumnInputCell({ value, refObj, onChange }: ColumnInputCellProps) {
    return (
        <td className="px-3 py-2 border border-default">
            <FInput
                inputSize="sm"
                placeholder="Enter Text"
                value={value}
                ref={refObj}
                onChange={(e) => onChange(e.target.value)}
            />
        </td>
    );
}

type CorrectMatchSelectProps = {
    vm: PairMatchEnAVm;
    item: PairMatchItemVm;
};

function CorrectMatchSelect({ vm, item }: CorrectMatchSelectProps) {
    return (
        <td className="px-3 py-2 border border-default">
            <Observer>
                {() => (
                    <FSelect
                        inputSize="sm"
                        value={item.correctRowUid ?? ""}
                        onChange={(e) => item.setCorrectRowUid(e.target.value)}
                    >
                        <option value="">Select Correct Match</option>
                        {vm.items.map((optItem, idx) => (
                            <option key={optItem.rowUid} value={optItem.rowUid}>
                                {optItem.colBText?.trim() || `Row ${idx + 1}`}
                            </option>
                        ))}
                    </FSelect>
                )}
            </Observer>
        </td>
    );
}

function RemoveRowButton({ onRemove }: { onRemove: () => void }) {
    return (
        <button
            className="p-1.5 bg-red-50 text-red-500 rounded hover:bg-red-100 text-xs"
            type="button"
            onClick={onRemove}
        >
            <Trash2 size={16} />
        </button>
    );
}
