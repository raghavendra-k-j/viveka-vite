import { TextAreaQuestionView } from "../comp/TextAreaQuestionView";
import { QuestionVm, type QuestionRendererProps, type QuestionVmProps } from "./QuestionVm";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { Answer, TextAreaAnswer } from "~/domain/forms/models/answer/Answer";
import { Node as ProseMirrorNode } from 'prosemirror-model';

type TextAreaQuestionVmProps = QuestionVmProps & {};

export class TextAreaQuestionVm extends QuestionVm {
    public ansStr = "";

    constructor(props: TextAreaQuestionVmProps) {
        super(props);
        makeObservable(this, {
            ansStr: observable,
            isAnswered: computed
        });
    }

    public onAnsStrChanged(value: ProseMirrorNode): void {
        runInAction(() => {
            this.ansStr = value.textContent ?? "";
        });
        this.validate();
    }

    get isAnswered(): boolean {
        return this.ansStr.trim().length > 0;
    }

    validateQuestion(): string | undefined {
        if (this.base.isRequired.isTrue && !this.isAnswered) {
            return QuestionVm.DEFAULT_REQUIRED_ERROR_MESSAGE;
        }
        return undefined;
    }

    render(props: QuestionRendererProps): React.JSX.Element {
        return <TextAreaQuestionView vm={this} parentVm={props.parentVm} />;
    }

    getAnswer(): Answer | undefined {
        if (!this.isAnswered) {
            return undefined;
        }
        const ansString = this.ansStr.trim();
        return new TextAreaAnswer({ answer: ansString });
    }

}
