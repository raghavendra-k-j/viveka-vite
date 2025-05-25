import { EnAVm, EnAVmProps } from "../ena/EnAVmBase";
import { QExtras, PairMatchQExtras, PairMatchItem } from "~/domain/forms/models/question/QExtras";
import { Answer, PairMatchAnswer, PairMatchAnswerItem } from "~/domain/forms/models/answer/Answer";
import React, { useState } from "react";

export type PairMatchItemVm = {
    colAText: string;
    colBText: string;
    correctRowId: number | null;
};

export type PairMatchEnAVmProps = EnAVmProps & {
    items: PairMatchItemVm[];
};

export class PairMatchEnAVm extends EnAVm {
    items: PairMatchItemVm[];

    constructor(props: PairMatchEnAVmProps) {
        super(props);
        this.items = props.items;
    }

    static empty(props: EnAVmProps): PairMatchEnAVm {
        const items: PairMatchItemVm[] = [
            { colAText: "", colBText: "", correctRowId: null },
            { colAText: "", colBText: "", correctRowId: null },
            { colAText: "", colBText: "", correctRowId: null },
        ];
        return new PairMatchEnAVm({ ...props, items });
    }

    getAnswer(): Answer | null {
        // All answers must be selected
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].correctRowId == null) return null;
        }
        const answers = this.items.map((item, idx) => new PairMatchAnswerItem({ rowId: idx + 1, correctRowId: item.correctRowId! }));
        return new PairMatchAnswer({ answers });
    }

    getErrorMessageIfAny(): string | null {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (!item.colAText.trim()) return `Please enter a label for row ${i + 1}`;
            if (!item.colBText.trim()) return `Please enter a label for row ${i + 1}`;
            if (item.correctRowId == null) return `Please select a correct row for row ${i + 1}`;
        }
        return null;
    }

    getQExtra(): QExtras {
        const items = this.items.map((item, idx) => new PairMatchItem({ rowId: idx + 1, colAText: item.colAText, colBText: item.colBText }));
        return new PairMatchQExtras({ items });
    }

    render(): React.ReactNode {
        return <PairMatchEnAView vm={this} onChange={(items) => { this.items = items; }} scorable={true} />;
    }
}

// React component for editing Pair Match items
export function PairMatchEnAView({ vm, onChange, scorable }: {
    vm: PairMatchEnAVm;
    onChange: (items: PairMatchItemVm[]) => void;
    scorable: boolean;
}) {
    const [items, setItems] = useState<PairMatchItemVm[]>(vm.items);

    const handleColAChange = (idx: number, value: string) => {
        const newItems = items.map((item, i) => i === idx ? { ...item, colAText: value } : item);
        setItems(newItems);
        onChange(newItems);
    };
    const handleColBChange = (idx: number, value: string) => {
        const newItems = items.map((item, i) => i === idx ? { ...item, colBText: value } : item);
        setItems(newItems);
        onChange(newItems);
    };
    const handleCorrectRowChange = (idx: number, value: number | null) => {
        // Only one item can have a given correctRowId
        const newItems = items.map((item, i) => {
            if (i === idx) return { ...item, correctRowId: value };
            if (item.correctRowId === value) return { ...item, correctRowId: null };
            return item;
        });
        setItems(newItems);
        onChange(newItems);
    };
    const handleRemove = (idx: number) => {
        let newItems = items.filter((_, i) => i !== idx);
        // Adjust correctRowId and reindex
        newItems = newItems.map((item) => {
            let correctRowId = item.correctRowId;
            if (correctRowId != null) {
                if (correctRowId === idx + 1) correctRowId = null;
                else if (correctRowId > idx + 1) correctRowId = correctRowId - 1;
            }
            return { ...item, correctRowId };
        });
        setItems(newItems);
        onChange(newItems);
    };
    const handleAdd = () => {
        if (items.length >= 10) return;
        const newItems = [...items, { colAText: "", colBText: "", correctRowId: null }];
        setItems(newItems);
        onChange(newItems);
    };
    const handleShuffle = () => {
        const map = { Apple: "Red", Banana: "Yellow", Grapes: "Green", Orange: "Orange" } as const;
        const colA = Object.keys(map) as Array<keyof typeof map>;
        let colB = Object.values(map);
        let correctRowIds: number[] | undefined;
        if (scorable) {
            colB = [...colB];
            for (let i = colB.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [colB[i], colB[j]] = [colB[j], colB[i]];
            }
            correctRowIds = colA.map(a => colB.indexOf(map[a]) + 1);
        }
        const newItems = colA.map((a, i) => ({
            colAText: a,
            colBText: colB[i],
            correctRowId: scorable ? correctRowIds![i] : null,
        }));
        setItems(newItems);
        onChange(newItems);
    };
    return (
        <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Row</th>
                        <th>Column A</th>
                        <th>Column B</th>
                        {scorable && <th>Answer</th>}
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td style={{ textAlign: "center" }}>{idx + 1}</td>
                            <td>
                                <input
                                    value={item.colAText}
                                    onChange={e => handleColAChange(idx, e.target.value)}
                                    placeholder="Enter Column A"
                                    style={{ width: "100%" }}
                                />
                            </td>
                            <td>
                                <input
                                    value={item.colBText}
                                    onChange={e => handleColBChange(idx, e.target.value)}
                                    placeholder="Enter Column B"
                                    style={{ width: "100%" }}
                                />
                            </td>
                            {scorable && (
                                <td>
                                    <select
                                        value={item.correctRowId ?? ""}
                                        onChange={e => handleCorrectRowChange(idx, e.target.value ? Number(e.target.value) : null)}
                                    >
                                        <option value="">Select Answer</option>
                                        {items.map((b, i) => (
                                            <option key={i} value={i + 1}>{b.colBText}</option>
                                        ))}
                                    </select>
                                </td>
                            )}
                            <td>
                                <button type="button" onClick={() => handleRemove(idx)} disabled={items.length <= 1}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                <button type="button" onClick={handleShuffle}>Reset to Example</button>
                <button type="button" onClick={handleAdd} disabled={items.length >= 10}>Add Row</button>
            </div>
        </div>
    );
}
