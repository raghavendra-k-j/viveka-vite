import { action, makeObservable, observable } from "mobx";
import { createRef } from "react";
import { UUIDUtil } from "~/core/utils/UUIDUtil";

export type PairMatchItemProps = {
    rowId: number;
    colAText: string;
    colBText: string;
    correctRowId: number | null;
}

export class PairMatchItemVm {
    uid: string = UUIDUtil.compact;
    rowId: number;
    colAText: string;
    colARef: React.RefObject<HTMLInputElement | null> = createRef();
    colBText: string;
    colBRef: React.RefObject<HTMLInputElement | null> = createRef();
    correctRowId: number | null;

    constructor(props: PairMatchItemProps) {
        this.rowId = props.rowId;
        this.colAText = props.colAText;
        this.colBText = props.colBText;
        this.correctRowId = props.correctRowId;
        makeObservable(this, {
            colAText: observable,
            colBText: observable,
            onColATextChange: action,
            onColBTextChange: action,
            correctRowId: observable,
        });
    }

    onColATextChange(text: string) {
        this.colAText = text;
    }

    onColBTextChange(text: string) {
        this.colBText = text;
    }
};