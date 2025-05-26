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
            <table className="min-w-full border border-secondary rounded-md">
                <TableHeader />
                <tbody>
                    <Observer>
                        {() => (
                            <>
                                {vm.items.map((item) => (
                                    <PairMatchRowItem
                                        key={item.uid}
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
            <div className="mt-2 flex justify-end">
                <OutlinedButton size="sm" onClick={() => vm.addRow()}>Add Row</OutlinedButton>
            </div>
        </div>
    );
}

function TableHeader() {
    const headers = ["#", "Column A", "Column B", "Correct Match"];
    return (
        <thead className="bg-gray-100">
            <tr>
                {headers.map((title, idx) => (
                    <th
                        key={title}
                        className={
                            `px-3 py-2 border border-default text-left text-xs font-medium` +
                            (idx !== headers.length - 1 ? ' border-default' : '')
                        }
                    >
                        {title}
                    </th>
                ))}
                <th className="px-3 py-2 border border-default text-left text-xs font-medium">Action</th>
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
    const rowIndex = vm.items.findIndex((i) => i.uid === item.uid) + 1;
    return (
        <tr className="hover:bg-gray-50">
            <td className="border border-default px-3 py-2 text-center w-10">{rowIndex}</td>
            <Observer>
                {() => (
                    <InputCell
                        placeholder="Enter Column A Text"
                        value={item.colAText}
                        refObj={item.colARef}
                        onChange={(v) => item.onColATextChange(v)}
                        className="border-default"
                    />
                )}
            </Observer>
            <Observer>
                {() => (
                    <InputCell
                        placeholder="Enter Column B Text"
                        value={item.colBText}
                        refObj={item.colBRef}
                        onChange={(v) => item.onColBTextChange(v)}
                        className="border-default"
                    />
                )}
            </Observer>
            <Observer>
                {() => (
                    <SelectCorrectMatch
                        vm={vm}
                        item={item}
                        className="border-default"
                    />
                )}
            </Observer>
            <td className="border border-default px-3 py-2 text-center">
                <RemoveRowButton onRemove={onRemove} />
            </td>
        </tr>
    );
}

type InputCellProps = {
    placeholder: string;
    value: string;
    refObj: React.RefObject<HTMLInputElement | null>;
    onChange: (text: string) => void;
};

function InputCell({ placeholder, value, refObj, onChange, className = '' }: InputCellProps & { className?: string }) {
    return (
        <td className={`px-3 py-2 border border-default ${className}`}>
            <FInput
                inputSize="sm"
                placeholder={placeholder}
                value={value}
                ref={refObj}
                onChange={(e) => onChange(e.target.value)}
            />
        </td>
    );
}

type SelectCorrectMatchProps = {
    vm: PairMatchEnAVm;
    item: PairMatchItemVm;
};

function SelectCorrectMatch({ vm, item, className = '' }: SelectCorrectMatchProps & { className?: string }) {
    return (
        <td className={`px-3 py-2 ${className}`}>
            <FSelect inputSize="sm">
                <option value="">Select Correct Match</option>
                {vm.items.map((optItem, idx) => (
                    <Observer key={optItem.uid}>
                        {() => (
                            <option
                                key={optItem.uid}
                                value={optItem.rowId}
                                selected={item.correctRowId === optItem.rowId}
                            >
                                {optItem.colBText && optItem.colBText.trim() !== '' ? optItem.colBText : `Row ${idx + 1}`}
                            </option>
                        )}
                    </Observer>
                ))}
            </FSelect>
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
