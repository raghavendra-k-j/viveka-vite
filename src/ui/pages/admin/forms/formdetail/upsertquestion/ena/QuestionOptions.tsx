import { JSX } from "react";
import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { FillBlankOptionsView } from "./FillBlankOptionsView";
import { Question } from "~/domain/forms/admin/models/Question";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";

export type QuestionOptionsProps = {
    storeRef: UpsertQuestionStore;
};

export abstract class QuestionOptions {

    protected readonly storeRef: UpsertQuestionStore;

    constructor({ storeRef }: QuestionOptionsProps) {
        this.storeRef = storeRef;
    }

    abstract render(): JSX.Element;

    static fromQuestion({ question, storeRef }: { question: Question; storeRef: UpsertQuestionStore }): QuestionOptions | null {
        if (question.type.isFillBlank) {
            return new FillBlankOptions({ storeRef });
        }
        return null;
    }

    static empty(props: { type: QuestionType, storeRef: UpsertQuestionStore }): QuestionOptions | null {
        if (props.type.isFillBlank) {
            return new FillBlankOptions({ storeRef: props.storeRef });
        }
        return null;
    }
}

export class FillBlankOptions extends QuestionOptions {
    constructor(props: QuestionOptionsProps) {
        super(props);
    }

    public handleAddBlank = () => {
        const editor = this.storeRef.vm.questionTextRef.current;
        editor?.insertBlank();
    };

    render() {
        return FillBlankOptionsView(this);
    }
}

