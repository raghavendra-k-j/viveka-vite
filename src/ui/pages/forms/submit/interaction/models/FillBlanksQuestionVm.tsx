import { action, makeObservable, observable } from "mobx";
import { QuestionVm, type QuestionVmProps, type QuestionRendererProps } from "./QuestionVm";
import type { JSX } from "react";
import type { FillBlankInput, FillBlanksQExtras } from "~/domain/forms/models/question/QExtras";
import { FillBlanksQuestionView } from "../comp/FillBlanksQuestionView";
import { Answer, FillBlankInputAnswer, FillBlanksAnswer } from "~/domain/forms/models/answer/Answer";
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { FormQuestionConst } from "~/domain/forms/const/FormQuestionConst";

export class FillBlankItemVm {
    input: FillBlankInput;
    ansNode: ProseMirrorNode | null = null;
    error: string | undefined = undefined;

    constructor(input: FillBlankInput) {
        this.input = input;
        makeObservable(this, {
            ansNode: observable,
            error: observable,
        });
    }

    get isAnswered() {
        if (this.ansNode === null) {
            return false;
        }
        const html = PmConverter.toTextOrEmpty({
            doc: this.ansNode,
            schema: inlineSchema
        });
        return html.length > 0;
    }

    get ansStr(): string {
        if (this.ansNode === null) {
            return '';
        }
        return PmConverter.toTextOrEmpty({
            doc: this.ansNode,
            schema: inlineSchema
        });
    }

    onAnsChanged(value: ProseMirrorNode | null) {
        this.ansNode = value;
        this.validateField();
    }

    validateField(): string | undefined {
        const ansString = this.ansStr;
        if (ansString.length > FormQuestionConst.FILL_BLANKS_ANSWER_MAX_LENGTH) {
            this.error = `Fill up ` + this.input.id + ` answer exceeds the maximum length of ` + FormQuestionConst.FILL_BLANKS_ANSWER_MAX_LENGTH + ` characters.`;
            return this.error;
        }
        this.error = undefined;
        return undefined;
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
            onAnsStrChanged: action,
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
            return QuestionVm.DEFAULT_REQUIRED_ERROR_MESSAGE;
        }
        for (const item of this.items) {
            const err = item.validateField();
            if (err) {
                return err;
            }
        }
        return undefined;
    }

    onAnsStrChanged(item: FillBlankItemVm, value: ProseMirrorNode | null) {
        item.onAnsChanged(value);
        this.validate();
    }

    render(props: QuestionRendererProps): JSX.Element {
        return <FillBlanksQuestionView vm={this} parentVm={props.parentVm} />;
    }

    getAnswer(): Answer | undefined {
        if (!this.isAnswered) {
            return undefined;
        }
        const answers: FillBlankInputAnswer[] = [];
        for (const item of this.items) {
            if (item.ansNode === null) {
                continue;
            }
            const ansString = PmConverter.toTextOrEmpty({
                doc: item.ansNode,
                schema: inlineSchema
            });
            if (ansString.length === 0) {
                continue;
            }
            answers.push(new FillBlankInputAnswer({
                id: item.input.id,
                answer: ansString
            }));
        }

        return new FillBlanksAnswer({ answers });
    }

}
