import type { JSX } from "react";
import type { Question } from "~/domain/forms/models/question/Question";
import { QuestionVmBase } from "./QuestionBase";
import type { InteractionVm } from "./InteractionVm";
import { runInAction } from "mobx";
import { InstanceId } from "~/core/utils/InstanceId";
import { logger } from "~/core/utils/logger";
import { GroupQuestionVm } from "./GroupQuestionVm";

export type QuestionRendererProps = {
    vm: QuestionVm;
    parentVm?: GroupQuestionVm;
}

export type QuestionVmProps = {
    question: Question;
    store: InteractionVm;
}

export abstract class QuestionVm {

    static readonly DEFAULT_REQUIRED_ERROR_MESSAGE = "This question is required.";

    public base: QuestionVmBase;
    public instanceId = InstanceId.generate("QuestionVm");

    abstract get isAnswered(): boolean;

    get hasError(): boolean {
        return this.base.error !== undefined;
    }

    validate(): string | undefined {
        if (!this.base.isVisible) {
            return undefined;
        }
        const err = this.validateQuestion();
        runInAction(() => {
            this.base.error = err;
        });
        return err;
    }

    abstract validateQuestion(): string | undefined;

    constructor(vmProps: QuestionVmProps) {
        if (vmProps.question.type.isTextBox) {
            logger.debug("Creating QuestionVm with instance id: ", this.instanceId, "and parent store: ", vmProps.store.parentStore.instanceId);
        }
        this.base = new QuestionVmBase({
            question: vmProps.question,
            store: vmProps.store,
        });
    }

    abstract render(props: QuestionRendererProps): JSX.Element;
}