import { TextAreaQuestionView } from "../comp/TextAreaQuestionView";
import { QuestionVm, type QuestionRendererProps, type QuestionVmProps } from "./QuestionVm";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { Answer, TextAreaAnswer } from "~/domain/forms/models/answer/Answer";
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { PmToMd } from "~/ui/components/richpmeditor/utils/PmToMd";
import { schema } from "~/ui/components/richpmeditor/pm/schema";

type TextAreaQuestionVmProps = QuestionVmProps & {};

export class TextAreaQuestionVm extends QuestionVm {
    public ansNode: ProseMirrorNode | undefined = undefined;

    constructor(props: TextAreaQuestionVmProps) {
        super(props);
        makeObservable(this, {
            ansNode: observable.ref,
            isAnswered: computed
        });
    }

    public onAnsStrChanged(value: ProseMirrorNode): void {
        runInAction(() => {
            this.ansNode = value;
        });
        this.validate();
    }

    get isAnswered(): boolean {
        if (this.ansNode === undefined) {
            return false;
        }
        return this.ansNode.textContent.trim().length > 0;
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
        const ansString = PmToMd.getContent(this.ansNode!, schema);
        return new TextAreaAnswer({ answer: ansString });
    }

}
