import { EnAVm, EnAVmProps } from "./EnAVmBase";
import { QExtras } from "~/domain/forms/models/question/QExtras";
import { Answer } from "~/domain/forms/models/answer/Answer";
import React from "react";
import { PairMatchEnAView } from "./PairMatchEnAView";
import { action, makeObservable, observable } from "mobx";
import { PairMatchItemVm } from "./PairMatchItemVm";


export type PairMatchEnAVmProps = EnAVmProps & {
    items: PairMatchItemVm[];
};

export class PairMatchEnAVm extends EnAVm {
    items: PairMatchItemVm[];
    nextRowId: number;

    constructor(props: PairMatchEnAVmProps) {
        super(props);
        this.items = props.items;
        this.nextRowId = this.items.length > 0 ? Math.max(...this.items.map(i => i.rowId)) + 1 : 1;
        makeObservable(this, {
            items: observable,
            addRow: action,
            removeRow: action,
        });
    }

    static empty(props: EnAVmProps): PairMatchEnAVm {
        const items: PairMatchItemVm[] = [];
        for (let i = 1; i <= 3; i++) {
            items.push(new PairMatchItemVm({
                rowId: i,
                colAText: "",
                colBText: "",
                correctRowId: null
            }));
        }
        return new PairMatchEnAVm({
            ...props,
            items: items
        });
    }

    getAnswer(): Answer | null {
        return null;
    }

    getQExtra(): QExtras {
        return null!;
    }

    addRow() {
        this.items.push(new PairMatchItemVm({
            rowId: this.nextRowId++,
            colAText: "",
            colBText: "",
            correctRowId: null
        }));
    }

    removeRow(item: PairMatchItemVm) {
        this.items = this.items.filter(i => i !== item);
    }

    render(): React.ReactNode {
        return PairMatchEnAView(this);
    }
}

