import { EnAVm, EnAVmProps } from "./EnAVmBase";
import { ChoiceVm } from "./ChoiceVm";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { Observer } from "mobx-react-lite";
import { action, makeObservable, observable } from "mobx";
import { Plus } from 'lucide-react';
import { QExtras, Choice, MultipleChoiceQExtras, CheckBoxesQExtras } from "~/domain/forms/models/question/QExtras";
import { Answer, MultipleChoiceAnswer, CheckBoxesAnswer } from "~/domain/forms/models/answer/Answer";
import { createRef } from "react";
import { PmToHtml } from "~/ui/components/richpmeditor/utils/PmToHtml";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";

export type ObjectiveEnAVmProps = EnAVmProps & {
    type: QuestionType;
    choices: ChoiceVm[];
}

export class ObjectiveEnAVm extends EnAVm {
    type: QuestionType;
    choices: ChoiceVm[];

    constructor(props: ObjectiveEnAVmProps) {
        super(props);
        this.type = props.type;
        this.choices = props.choices;

        makeObservable(this, {
            choices: observable.shallow,
            addChoice: action,
            removeChoice: action,
            onClickChoice: action,
        });
    }

    getQExtra(): QExtras | null {
        if (this.choices.length === 0) return null;

        const choiceStrings: Choice[] = [];

        for (let i = 1; i <= this.choices.length; i++) {
            const choice = this.choices[i - 1];
            const contentNode = choice.ref.current?.getContent();
            const choiceString = contentNode ? PmToHtml.getContent(contentNode, inlineSchema) : "";

            choiceStrings.push(new Choice({
                id: i,
                text: choiceString,
            }));
        }

        if (this.type.isMultipleChoice) {
            return new MultipleChoiceQExtras({ choices: choiceStrings });
        } else {
            return new CheckBoxesQExtras({ choices: choiceStrings });
        }
    }

    getAnswer(): Answer | null {
        if (this.choices.length === 0) return null;

        const correctChoices: number[] = [];
        for (let i = 1; i <= this.choices.length; i++) {
            const choice = this.choices[i - 1];
            if (choice.isCorrect) correctChoices.push(i);
        }

        if (correctChoices.length === 0) return null;

        if (this.type.isMultipleChoice) {
            return new MultipleChoiceAnswer({ id: correctChoices[0] });
        } else {
            return new CheckBoxesAnswer({ ids: correctChoices });
        }
    }

    addChoice() {
        this.choices.push(
            new ChoiceVm({
                ref: createRef<RichPmEditorRef | null>(),
                isCorrect: false,
            })
        );
    }

    removeChoice(index: number) {
        if (this.choices.length <= 2) return;
        this.choices.splice(index, 1);
    }

    onClickChoice(index: number) {
        const isMultiple = this.type.isCheckBoxes;
        if (isMultiple) {
            this.choices[index].isCorrect = !this.choices[index].isCorrect;
        } else {
            this.choices.forEach((choice, i) => choice.isCorrect = i === index);
        }
    }

    static empty({ type, storeRef }: { type: QuestionType, storeRef: UpsertQuestionStore }): ObjectiveEnAVm {
        const choices = Array.from({ length: 4 }, () => new ChoiceVm({
            ref: createRef<RichPmEditorRef | null>(),
            isCorrect: false,
        }));

        return new ObjectiveEnAVm({
            type: type,
            storeRef: storeRef,
            choices: choices,
        });
    }

    render(): React.ReactNode {
        const isMultiple = this.type.isCheckBoxes;

        return (
            <Observer>
                {() => (
                    <div className="flex flex-col gap-4">
                        {this.choices.map((choice, index) => (
                            choice.render({
                                isMultiple,
                                index,
                                choicesLength: this.choices.length,
                                onClickChoice: (i) => this.onClickChoice(i),
                                onRemoveChoice: (i) => this.removeChoice(i),
                                stt: this.storeRef.stt
                            })
                        ))}

                        <div>
                            <button
                                type="button"
                                onClick={() => this.addChoice()}
                                className="text-primary hover:underline flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Choice
                            </button>
                        </div>
                    </div>
                )}
            </Observer>
        );
    }
}
