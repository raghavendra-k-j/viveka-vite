import { TextQuestionView } from "../comp/TextQuestionView";
import { QuestionVm, type QuestionRendererProps, type QuestionVmProps } from "./QuestionVm";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { Answer, TextAreaAnswer, TextBoxAnswer } from "~/domain/forms/models/answer/Answer";
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { blockSchema, inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { FormQuestionConst } from "~/domain/forms/const/FormQuestionConst";

type TextQuestionVmProps = QuestionVmProps & {};

export class TextQuestionVm extends QuestionVm {
    public ansNode: ProseMirrorNode | undefined = undefined;

    constructor(props: TextQuestionVmProps) {
        super(props);
        makeObservable(this, {
            ansNode: observable.ref,
            isAnswered: computed
        });
    }

    get isMultiline(): boolean {
        return this.base.type.isTextArea;
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
        const html = PmConverter.toTextOrEmpty({
            doc: this.ansNode,
            schema: this.isMultiline ? blockSchema : inlineSchema
        });
        return html.length > 0;
    }

    get ansString(): string {
        if (this.ansNode === undefined) {
            return '';
        }
        return PmConverter.toTextOrEmpty({
            doc: this.ansNode,
            schema: this.isMultiline ? blockSchema : inlineSchema
        });
    }

    validateQuestion(): string | undefined {
        if (this.base.isRequired.isTrue && !this.isAnswered) {
            return QuestionVm.DEFAULT_REQUIRED_ERROR_MESSAGE;
        }
        const ansString = this.ansString;
        if (this.isMultiline) {
            if (ansString.length > FormQuestionConst.LONG_ANSWER_MAX_LENGTH) {
                return `Answer exceeds the maximum length of ${FormQuestionConst.LONG_ANSWER_MAX_LENGTH} characters.`;
            }
        }
        else {
            if (ansString.length > FormQuestionConst.SHORT_ANSWER_MAX_LENGTH) {
                return `Answer exceeds the maximum length of ${FormQuestionConst.SHORT_ANSWER_MAX_LENGTH} characters.`;
            }
        }
        return undefined;
    }

    render(props: QuestionRendererProps): React.JSX.Element {
        return <TextQuestionView vm={this} parentVm={props.parentVm} />;
    }

    getAnswer(): Answer | undefined {
        if (!this.isAnswered) {
            return undefined;
        }
        const ansString = PmConverter.toTextOrEmpty({
            doc: this.ansNode!,
            schema: this.isMultiline ? blockSchema : inlineSchema
        });
        if (this.isMultiline) {
            return new TextAreaAnswer({ answer: ansString });
        }
        else {
            return new TextBoxAnswer({ answer: ansString });
        }
    }
}
