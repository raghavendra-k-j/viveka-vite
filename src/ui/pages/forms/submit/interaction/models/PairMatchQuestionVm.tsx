import { makeObservable, observable, computed, runInAction } from "mobx";
import type { JSX } from "react";
import type { PairMatchQExtras, PairMatchItem } from "~/domain/forms/models/question/QExtras";
import { QuestionVm, type QuestionRendererProps, type QuestionVmProps } from "../models/QuestionVm";
import { PairMatchQuestionView } from "../comp/PairMatchQuestionView";
import { Answer, PairMatchAnswer, PairMatchAnswerItem } from "~/domain/forms/models/answer/Answer";

export class PairMatchItemVm {
    rowId: number;
    colAText: string;
    colBText: string;
    selectedRowId: number | null = null;

    constructor(item: PairMatchItem) {
        this.rowId = item.rowId;
        this.colAText = item.colAText;
        this.colBText = item.colBText;

        makeObservable(this, {
            selectedRowId: observable,
        });
    }

    setSelectedRowId(rowId: number | null) {
        runInAction(() => {
            this.selectedRowId = rowId;
        });
    }

    get isAnswered(): boolean {
        return this.selectedRowId !== null;
    }

    get hasError(): boolean {
        return this.selectedRowId === null;
    }

}

export class PairMatchQuestionVm extends QuestionVm {
    items: PairMatchItemVm[] = [];

    constructor(props: QuestionVmProps) {
        super(props);

        const extras = props.question.qExtras as PairMatchQExtras;
        this.items = extras.items.map(item => new PairMatchItemVm(item));

        makeObservable(this, {
            items: observable,
            isAnswered: computed,
        });
    }

    setSelectedRowIdForItem(index: number, rowId: number | null) {
        if (index >= 0 && index < this.items.length) {
            this.items[index].setSelectedRowId(rowId);
        }
        this.validate();
    }

    get isAnswered(): boolean {
        return this.selectedCount === this.items.length;
    }

    render(props: QuestionRendererProps): JSX.Element {
        return <PairMatchQuestionView vm={this} parentVm={props.parentVm} />;
    }

    private get selectedCount(): number {
        return this.items.filter(item => item.selectedRowId !== null).length;
    }

    validateQuestion(): string | undefined {
        const selectedCount = this.selectedCount;
        if (this.base.isRequired.isTrue) {
            if (selectedCount === 0) {
                return QuestionVm.DEFAULT_REQUIRED_ERROR_MESSAGE;
            }
            if (selectedCount !== this.items.length) {
                return "Please select all the correct matches";
            }
        }
    }


    getAnswer(): Answer | undefined {
        if (!this.isAnswered) return undefined;
        const answers = this.items.map(item => {
            if (item.selectedRowId === null) return null;
            return new PairMatchAnswerItem({
                rowId: item.rowId,
                correctRowId: item.selectedRowId,
            });
        });
        if (answers.includes(null)) return undefined;
        return new PairMatchAnswer({ answers: answers as PairMatchAnswerItem[] });
    }


}
