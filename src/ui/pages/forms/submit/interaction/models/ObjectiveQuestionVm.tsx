import { makeObservable, observable, runInAction, computed } from "mobx";
import { Choice, type CheckBoxesQExtras, type MultipleChoiceQExtras, type QExtras, type TrueFalseQExtras } from "~/domain/forms/models/question/QExtras";
import { QuestionVm, type QuestionRendererProps, type QuestionVmProps } from "./QuestionVm";
import { ObjectiveQuestionView } from "../comp/ObjectiveQuestionView";
import { Answer, CheckBoxesAnswer, MultipleChoiceAnswer, TrueFalseAnswer } from "~/domain/forms/models/answer/Answer";

type ObjectiveQuestionVmProps = QuestionVmProps & {}

export class ObjectiveQuestionVm extends QuestionVm {
    public choices: Choice[] = [];
    public selectedChoices: Set<number> = new Set();

    constructor(props: ObjectiveQuestionVmProps) {
        super(props);
        const questionType = props.question.type;
        const qExtras = props.question.qExtras as QExtras;
        if (questionType.isCheckBoxes) {
            const checkboxExtras = qExtras as CheckBoxesQExtras;
            this.choices = checkboxExtras.choices;
        }
        else if (questionType.isMultipleChoice) {
            const multipleChoiceExtras = qExtras as MultipleChoiceQExtras;
            this.choices = multipleChoiceExtras.choices;
        }
        else if (questionType.isTrueFalse) {
            const trueFalseQExtras = qExtras as TrueFalseQExtras;
            const trueLabel = trueFalseQExtras.trueLabel;
            const falseLabel = trueFalseQExtras.falseLabel;
            const trueChoice: Choice = new Choice({ id: 1, text: trueLabel });
            const falseChoice: Choice = new Choice({ id: 2, text: falseLabel });
            this.choices = [trueChoice, falseChoice];
        }
        else {
            throw new Error("Invalid question type for ObjectiveQuestionVm: " + questionType);
        }
        makeObservable(this, {
            selectedChoices: observable,
            isAnswered: computed,
        });
    }

    public onChoiceClick(choice: Choice): void {
        if (this.base.type.isCheckBoxes) {
            if (this.selectedChoices.has(choice.id)) {
                runInAction(() => {
                    this.selectedChoices.delete(choice.id);
                });
            } else {
                runInAction(() => {
                    this.selectedChoices.add(choice.id);
                });
            }
        }
        else {
            runInAction(() => {
                if (this.selectedChoices.has(choice.id)) {
                    this.selectedChoices.clear();
                }
                else {
                    this.selectedChoices.clear();
                    this.selectedChoices.add(choice.id);
                }
            });
        }
        this.validate();
    }

    public isSelected(choice: Choice): boolean {
        return this.selectedChoices.has(choice.id);
    }

    get isAnswered(): boolean {
        return this.selectedChoices.size > 0;
    }

    validateQuestion(): string | undefined {
        if (this.base.isRequired && !this.isAnswered) {
            return QuestionVm.DEFAULT_REQUIRED_ERROR_MESSAGE;
        }
        return undefined;
    }

    render(props: QuestionRendererProps): React.JSX.Element {
        return (<ObjectiveQuestionView vm={this} parentVm={props.parentVm} />);
    }

    getAnswer(): Answer | undefined {
        if (!this.isAnswered) {
            return undefined;
        }
        const questionType = this.base.type;
        if (questionType.isMultipleChoice) {
            const selectedChoiceId = this.selectedChoices.values().next().value!;
            return new MultipleChoiceAnswer({ id: selectedChoiceId });
        }
        else if (questionType.isCheckBoxes) {
            const selectedChoiceIds = Array.from(this.selectedChoices);
            return new CheckBoxesAnswer({ ids: selectedChoiceIds });
        }
        else if (questionType.isTrueFalse) {
            const selectedChoiceId = this.selectedChoices.values().next().value!;
            return new TrueFalseAnswer({ value: selectedChoiceId === 1 });
        }
        else {
            throw new Error("Invalid question type for ObjectiveQuestionVm: " + questionType);
        }
    }

}
