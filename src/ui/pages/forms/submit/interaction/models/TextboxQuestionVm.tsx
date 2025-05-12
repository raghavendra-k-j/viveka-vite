import { TextboxQuestionView } from "../comp/TextboxQuestionView";
import { QuestionVm, type QuestionRendererProps, type QuestionVmProps } from "./QuestionVm";
import { makeObservable, observable, runInAction, computed } from "mobx";

type TextboxQuestionVmProps = QuestionVmProps & {

};

export class TextboxQuestionVm extends QuestionVm {
    public ansStr = "";

    constructor(props: TextboxQuestionVmProps) {
        super(props);
        makeObservable(this, {
            ansStr: observable,
            isAnswered: computed,
        });
    }

    public onAnsStrChanged(value: string): void {
        runInAction(() => {
            this.ansStr = value;
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
        return <TextboxQuestionView vm={this} parentVm={props.parentVm} />;
    }
}
