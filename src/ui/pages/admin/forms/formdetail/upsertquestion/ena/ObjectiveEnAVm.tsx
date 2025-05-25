import { EnAVm, EnAVmProps } from "../ena/EnAVmBase";
import { ChoiceEnAVm as ChoiceEnAVm } from "./ChoiceEnAVm";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { action, makeObservable, observable } from "mobx";
import { QExtras, Choice, MultipleChoiceQExtras, CheckBoxesQExtras, TrueFalseQExtras } from "~/domain/forms/models/question/QExtras";
import { Answer, MultipleChoiceAnswer, CheckBoxesAnswer, TrueFalseAnswer } from "~/domain/forms/models/answer/Answer";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { Question } from "~/domain/forms/admin/models/Question";
import { PmConverter } from "~/ui/components/richpmeditor/utils/PmConverter";
import { ObjectiveEnAView } from "./ObjectiveEnAView";

export type ObjectiveEnAVmProps = EnAVmProps & {
    type: QuestionType;
    choices: ChoiceEnAVm[];
}

export class ObjectiveEnAVm extends EnAVm {


    type: QuestionType;
    choices: ChoiceEnAVm[];

    constructor(props: ObjectiveEnAVmProps) {
        super(props);
        this.type = props.type;
        this.choices = props.choices;
        makeObservable(this, {
            choices: observable.shallow,
            addChoice: action,
            removeChoice: action,
            onClickControl: action,
        });
    }

    private getTrueFalseQExtras(): TrueFalseQExtras | null {
        const trueChoice = this.choices[0];
        const falseChoice = this.choices[1];
        const trueText = PmConverter.toTextFromRef({
            ref: trueChoice.ref,
            schema: inlineSchema
        });
        const falseText = PmConverter.toTextFromRef({
            ref: falseChoice.ref,
            schema: inlineSchema
        });
        if (!trueText || !falseText) return null;
        return new TrueFalseQExtras({
            trueLabel: trueText,
            falseLabel: falseText
        });
    }


    private getObjectiveQExtras(): QExtras | null {
        const choices: Choice[] = [];
        for (let i = 1; i <= this.choices.length; i++) {
            const choice = this.choices[i - 1];
            const choiceString = PmConverter.toTextFromRef({
                ref: choice.ref,
                schema: inlineSchema
            }) || "";
            choices.push(new Choice({ id: i, text: choiceString }));
        }
        if (this.type.isMultipleChoice) {
            return new MultipleChoiceQExtras({ choices });
        } else {
            return new CheckBoxesQExtras({ choices });
        }
    }

    getQExtra(): QExtras | null {
        if (this.choices.length === 0) return null;
        if (this.type.isTrueFalse) {
            return this.getTrueFalseQExtras();
        }
        else {
            return this.getObjectiveQExtras();
        }
    }

    getSelectedPositions(): number[] {
        const selected: number[] = [];
        for (let i = 1; i <= this.choices.length; i++) {
            if (this.choices[i - 1].selected) {
                selected.push(i);
            }
        }
        return selected;
    }

    getAnswer(): Answer | null {
        if (this.storeRef.vm.scorable.value.isNotTrue) return null;
        const selectedPositions = this.getSelectedPositions();
        if (selectedPositions.length === 0) return null;


        if (this.type.isTrueFalse) {
            return new TrueFalseAnswer({
                value: selectedPositions.includes(1)
            });
        }

        if (this.type.isMultipleChoice) {
            return new MultipleChoiceAnswer({
                id: selectedPositions[0]
            });
        }

        return new CheckBoxesAnswer({
            ids: selectedPositions
        });
    }

    addChoice() {
        if (this.type.isTrueFalse) return;
        const newChoice = new ChoiceEnAVm({
            selected: false,
            doc: null,
        });
        this.choices.push(newChoice);
    }

    removeChoice(index: number) {
        if (this.type.isTrueFalse) return;
        if (this.choices.length <= 2) return;
        this.choices.splice(index, 1);
    }

    onClickControl(index: number) {
        if (this.type.isTrueFalse) {
            // Only one can be correct, like radio
            this.choices.forEach((choice, i) => choice.selected = i === index);
            return;
        }
        const isMultiple = this.type.isCheckBoxes;
        if (isMultiple) {
            this.choices[index].selected = !this.choices[index].selected;
        } else {
            this.choices.forEach((choice, i) => choice.selected = i === index);
        }
    }

    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): ObjectiveEnAVm {
        let choices: ChoiceEnAVm[] = [];
        if (props.type.isTrueFalse) {
            choices = [
                new ChoiceEnAVm({ selected: false, doc: null }),
                new ChoiceEnAVm({ selected: false, doc: null }),
            ];
        }
        else {
            choices = [
                new ChoiceEnAVm({ selected: false, doc: null }),
                new ChoiceEnAVm({ selected: false, doc: null }),
                new ChoiceEnAVm({ selected: false, doc: null }),
                new ChoiceEnAVm({ selected: false, doc: null }),
            ];
        }
        return new ObjectiveEnAVm({
            type: props.type,
            storeRef: props.storeRef,
            choices,
        });
    }

    static fromQuestion(props: { question: Question; storeRef: UpsertQuestionStore; }): EnAVm {
        const qExtras = props.question.qExtras!;
        const answer = props.question.answer;
        if (props.question.type.isTrueFalse) {
            const trueFalseExtras = qExtras as TrueFalseQExtras;
            const trueFalseAnswer = answer ? (answer as TrueFalseAnswer) : null;
            const choices: ChoiceEnAVm[] = [];
            const trueChoiceText = PmConverter.toNode({
                text: trueFalseExtras.trueLabel,
                schema: inlineSchema
            });
            const falseChoiceText = PmConverter.toNode({
                text: trueFalseExtras.falseLabel,
                schema: inlineSchema
            });

            const trueChoice = new ChoiceEnAVm({
                selected: trueFalseAnswer ? (trueFalseAnswer.value === true) : false,
                doc: trueChoiceText,
            });
            const falseChoice = new ChoiceEnAVm({
                selected: trueFalseAnswer ? (trueFalseAnswer.value === false) : false,
                doc: falseChoiceText,
            });
            choices.push(trueChoice, falseChoice);
            return new ObjectiveEnAVm({
                type: props.question.type,
                storeRef: props.storeRef,
                choices: choices,
            });
        }
        else {
            if (props.question.type.isMultipleChoice) {
                const choices: ChoiceEnAVm[] = [];
                const multipleChoiceExtras = qExtras as MultipleChoiceQExtras;
                const multipleChoiceAnswer = answer ? (answer as MultipleChoiceAnswer) : null;
                for (const choice of multipleChoiceExtras.choices) {
                    const choiceText = PmConverter.toNode({
                        text: choice.text,
                        schema: inlineSchema
                    });
                    choices.push(new ChoiceEnAVm({
                        selected: multipleChoiceAnswer ? (multipleChoiceAnswer.id === choice.id) : false,
                        doc: choiceText,
                    }));
                }
                return new ObjectiveEnAVm({
                    type: props.question.type,
                    storeRef: props.storeRef,
                    choices: choices,
                });
            }
            else {
                const choices: ChoiceEnAVm[] = [];
                const checkBoxesExtras = qExtras as CheckBoxesQExtras;
                const checkBoxesAnswer = answer ? (answer as CheckBoxesAnswer) : null;
                for (const choice of checkBoxesExtras.choices) {
                    const choiceText = PmConverter.toNode({
                        text: choice.text,
                        schema: inlineSchema
                    });
                    choices.push(new ChoiceEnAVm({
                        selected: checkBoxesAnswer ? checkBoxesAnswer.ids.includes(choice.id) : false,
                        doc: choiceText,
                    }));
                }
                return new ObjectiveEnAVm({
                    type: props.question.type,
                    storeRef: props.storeRef,
                    choices: choices,
                });
            }
        }
    }

    render(): React.ReactNode {
        return ObjectiveEnAView(this);
    }

}





