import { makeObservable, observable, runInAction } from "mobx";
import { QuestionVm, type QuestionVmProps, type QuestionRendererProps } from "./QuestionVm";
import type { JSX } from "react";
import type { FillBlankInput, FillBlanksQExtras } from "~/domain/forms/models/question/QExtras";
import { FillBlanksQuestionView } from "../comp/FillBlanksQuestionView";
import { Answer, FillBlankInputAnswer, FillBlanksAnswer } from "~/domain/forms/models/answer/Answer";

export class FillBlankItemVm {
    input: FillBlankInput;
    ansStr: string = "";

    constructor(input: FillBlankInput) {
        this.input = input;
        makeObservable(this, {
            ansStr: observable,
        });
    }

    get isAnswered() {
        return this.ansStr.length > 0;
    }
}

export class FillBlanksQuestionVm extends QuestionVm {
    items: FillBlankItemVm[] = [];

    constructor(props: QuestionVmProps) {
        super(props);
        const qExtras = props.question.qExtras as FillBlanksQExtras;
        this.items = qExtras.inputs.map(input => new FillBlankItemVm(input));
        makeObservable(this, {
            items: observable,
        });
    }

    get isAnswered() {
        return this.items.some(item => item.isAnswered);
    }

    get answeredOutOfTotal() {
        const total = this.items.length;
        const answered = this.items.filter(item => item.isAnswered).length;
        return { answered, total };
    }

    validateQuestion(): string | undefined {
        if (this.base.isRequired.isTrue && !this.isAnswered) {
            return "This question is required.";
        }
        return undefined;
    }

    onAnsStrChanged(item: FillBlankItemVm, value: string) {
        runInAction(() => {
            item.ansStr = value;
        });
        this.validate();
    }


    render(props: QuestionRendererProps): JSX.Element {
        return <FillBlanksQuestionView vm={this} parentVm={props.parentVm} />;
    }

    getAnswer(): Answer | undefined {
        if (!this.isAnswered) {
            return undefined;
        }
        const answers = this.items.map(item => new FillBlankInputAnswer({
            id: item.input.id,
            answer: item.ansStr
        }));
        return new FillBlanksAnswer({ answers });
    }

}
