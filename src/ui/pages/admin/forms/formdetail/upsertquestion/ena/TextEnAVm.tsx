import { EnAVm, EnAVmProps } from "./EnAVmBase";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { createRef } from "react";
import { blockSchema, inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { PmToHtml } from "~/ui/components/richpmeditor/utils/PmToHtml";
import { Answer, TextAreaAnswer, TextBoxAnswer } from "~/domain/forms/models/answer/Answer";
import { TextEnAView } from "./TextEnAView";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { Question } from "~/domain/forms/admin/models/Question";

export type TextboxEnAVmProps = EnAVmProps & {
    type: QuestionType;
    answer: Answer | null;
}

export class TextEnAVm extends EnAVm {
    editorRef: React.RefObject<RichPmEditorRef | null>;
    type: QuestionType;
    node: ProseMirrorNode | null;

    constructor(props: TextboxEnAVmProps) {
        super(props);
        this.type = props.type;
        this.node = null;
        this.setupInitAnswer(props.answer);
        this.editorRef = createRef<RichPmEditorRef | null>();
    }

    setupInitAnswer(answer: Answer | null) {
        if (!answer) {
            this.node = null;
            return;
        }

        let ansString: string | undefined;

        if (this.type.isTextBox && answer instanceof TextBoxAnswer) {
            ansString = answer.answer;
        }
        else if (this.type.isTextArea && answer instanceof TextAreaAnswer) {
            ansString = answer.answer;
        }
        else {
            throw new Error("Invalid answer type for TextEnAVm");
        }

        this.node = ansString ? PmConverter.toNode({
            text: ansString,
            schema: this.type.isTextBox ? inlineSchema : blockSchema
        }) : null;
    }

    getQExtra(): null {
        return null;
    }

    getAnswer(): Answer | null {
        const content = this.editorRef.current?.getContent();
        if (!content) {
            return null;
        }
        const ansString = PmToHtml.convert(content, this.type.isTextBox ? inlineSchema : blockSchema);
        if (ansString.trim() === "") {
            return null;
        }

        if (this.type.isTextBox) {
            return new TextBoxAnswer({ answer: ansString });
        } else {
            return new TextAreaAnswer({ answer: ansString });
        }
    }

    static empty({ type, storeRef }: { type: QuestionType, storeRef: UpsertQuestionStore }): TextEnAVm {
        return new TextEnAVm({
            type: type,
            storeRef: storeRef,
            answer: null,
        });
    }

    static fromQuestion({ question, storeRef }: { question: Question, storeRef: UpsertQuestionStore }): TextEnAVm | null {
        return new TextEnAVm({
            type: question.type,
            storeRef: storeRef,
            answer: question.answer,
        });
    }

    render() {
        return TextEnAView(this);
    }
}


