import { action, makeObservable, observable } from "mobx";
import { createRef } from "react";

export type PairMatchItemProps = {
    rowUid: string;
    colAText: string;
    colBText: string;
    correctRowUid: string | null;
}

export class PairMatchItemVm {
    rowUid: string;
    colAText: string;
    colARef: React.RefObject<HTMLInputElement | null> = createRef();
    colBText: string;
    colBRef: React.RefObject<HTMLInputElement | null> = createRef();
    correctRowUid: string | null;

    constructor(props: PairMatchItemProps) {
        this.rowUid = props.rowUid;
        this.colAText = props.colAText;
        this.colBText = props.colBText;
        this.correctRowUid = props.correctRowUid;
        makeObservable(this, {
            colAText: observable,
            colBText: observable,
            onColATextChange: action,
            onColBTextChange: action,
            correctRowUid: observable,
            setCorrectRowUid: action,
        });
    }

    onColATextChange(text: string) {
        this.colAText = text;
    }

    onColBTextChange(text: string) {
        this.colBText = text;
    }

    setCorrectRowUid(rowUid: string | null) {
        this.correctRowUid = rowUid;
    }

};