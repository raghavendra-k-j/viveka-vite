import { EnAVm, EnAVmProps } from "./EnAVmBase";
import { PairMatchItem, PairMatchQExtras, QExtras } from "~/domain/forms/models/question/QExtras";
import { Answer, PairMatchAnswer, PairMatchAnswerItem } from "~/domain/forms/models/answer/Answer";
import React from "react";
import { PairMatchEnAView } from "./PairMatchEnAView";
import { action, makeObservable, observable } from "mobx";
import { PairMatchItemVm } from "./PairMatchItemVm";
import { UUIDUtil } from "~/core/utils/UUIDUtil";
import { Question } from "~/domain/forms/admin/models/Question";
import { UpsertQuestionStore } from "../UpsertQuestionStore";


export type PairMatchEnAVmProps = EnAVmProps & {
    items: PairMatchItemVm[];
};

export class PairMatchEnAVm extends EnAVm {

    items: PairMatchItemVm[];

    constructor(props: PairMatchEnAVmProps) {
        super(props);
        this.items = props.items;
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
                rowUid: UUIDUtil.compact,
                colAText: "",
                colBText: "",
                correctRowUid: null
            }));
        }
        return new PairMatchEnAVm({
            ...props,
            items: items
        });
    }

    getAnswer(): Answer | null {
        if (!this.items.length) return null;
        const answerItems = this.items
            .map((item, index) => this.createAnswerItem(item, index))
            .filter((item): item is PairMatchAnswerItem => item !== null);

        return answerItems.length ? new PairMatchAnswer({ answers: answerItems }) : null;
    }

    private createAnswerItem(item: PairMatchItemVm, index: number): PairMatchAnswerItem | null {
        const position = index + 1;

        if (!item.correctRowUid) {
            console.log("PairMatchEnAVm.getAnswer: Skipping item with no correctRowUid", item);
            return null;
        }

        const correctIndex = this.items.findIndex(i => i.rowUid === item.correctRowUid);
        if (correctIndex === -1) {
            console.log("PairMatchEnAVm.getAnswer: Skipping item with invalid correctRowUid", item);
            return null;
        }

        return new PairMatchAnswerItem({
            rowId: position,
            correctRowId: correctIndex + 1
        });
    }

    getQExtra(): QExtras | null {
        if (!this.items.length) return null;
        const pairs: PairMatchItem[] = this.items.map((item, index) => {
            return new PairMatchItem({
                rowId: index + 1,
                colAText: item.colAText,
                colBText: item.colBText
            });
        });
        return new PairMatchQExtras({ items: pairs });
    }

    addRow() {
        this.items.push(new PairMatchItemVm({
            rowUid: UUIDUtil.compact,
            colAText: "",
            colBText: "",
            correctRowUid: null
        }));
    }

    removeRow(item: PairMatchItemVm) {
        const index = this.items.findIndex(i => i.rowUid === item.rowUid);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }


    static fromQuestion(props: { question: Question; storeRef: UpsertQuestionStore; }): EnAVm | null {
        const qExtras = props.question.qExtras as PairMatchQExtras;
        const answer = props.question.answer as PairMatchAnswer;
        const items: PairMatchItemVm[] = qExtras.items.map(item => new PairMatchItemVm({
            rowUid: UUIDUtil.compact,
            colAText: item.colAText,
            colBText: item.colBText,
            correctRowUid: null
        }));
        // Map the answer to the correct row UIDs
        answer.answers.forEach(ansItem => {
            const index = ansItem.rowId - 1; 
            if (index >= 0 && index < items.length) {
                const correctIndex = ansItem.correctRowId - 1;
                if (correctIndex >= 0 && correctIndex < items.length) {
                    items[index].correctRowUid = items[correctIndex].rowUid;
                }
            }
        });
        return new PairMatchEnAVm({
            storeRef: props.storeRef,
            items: items
        });
    }


    render(): React.ReactNode {
        return PairMatchEnAView(this);
    }
}

