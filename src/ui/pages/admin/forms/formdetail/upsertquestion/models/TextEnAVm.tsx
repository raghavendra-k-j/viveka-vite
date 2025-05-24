import { EnAVm, EnAVmProps } from "./EnAVmBase";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { RichPmEditor, RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { createRef } from "react";
import { blockSchema, inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { FFieldContainer } from "~/ui/widgets/form/input/FFieldContainer";
import { FError } from "~/ui/widgets/form/FError";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { PmToHtml } from "~/ui/components/richpmeditor/utils/PmToHtml";
import { Observer } from "mobx-react-lite";
import { Answer, TextAreaAnswer, TextBoxAnswer } from "~/domain/forms/models/answer/Answer";

export type TextboxEnAVmProps = EnAVmProps & {
    type: QuestionType;
}

export class TextEnAVm extends EnAVm {
    editorRef: React.RefObject<RichPmEditorRef | null>;
    type: QuestionType;

    constructor(props: TextboxEnAVmProps) {
        super(props);
        this.type = props.type;
        this.editorRef = createRef<RichPmEditorRef | null>();
    }

    getQExtra(): null {
        return null;
    }
    getAnswer(): Answer | null {
        const content = this.editorRef.current?.getContent();
        if (!content) {
            return null;
        }
        const ansString = PmToHtml.getContent(content, this.type.isTextBox ? inlineSchema : blockSchema);
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
            storeRef: storeRef
        });
    }

    render(): React.ReactNode {
        return (
            <Observer>
                {() => {
                    if (this.storeRef.vm.scorable.value.isNotTrue) {
                        return null;
                    }
                    return (
                        <div>
                            <FFieldContainer>
                                <FLabel>Answer</FLabel>
                                <RichPmEditor
                                    placeholder="Enter Correct Answer"
                                    stt={this.storeRef.stt}
                                    ref={this.editorRef}
                                    schema={this.type.isTextBox ? inlineSchema : blockSchema}
                                />
                                <FError></FError>
                            </FFieldContainer>
                        </div>
                    );
                }}
            </Observer>
        );
    }
}
