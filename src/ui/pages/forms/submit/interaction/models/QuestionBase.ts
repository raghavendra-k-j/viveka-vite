import type { Bool3 } from "~/core/utils/Bool3";
import type { QExtras } from "~/domain/forms/models/question/QExtras";
import type { QMedia } from "~/domain/forms/models/question/QMedia";
import type { Question } from "~/domain/forms/models/question/Question";
import type { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";
import type { QuestionType } from "~/domain/forms/models/question/QuestionType";
import type { InteractionVm } from "./InteractionVm";
import { makeObservable, observable } from "mobx";

export type QuestionVmBaseProps = {
    question: Question;
    store: InteractionVm;
};

export class QuestionVmBase {
    public store: InteractionVm;
    public id: number;
    public parentId?: number;
    public dOrder: number;
    public type: QuestionType;
    public question: string;
    public qExtras?: QExtras;
    public ansHint?: string;
    public level?: QuestionLevel;
    public marks?: number;
    public mediaFiles?: QMedia[];
    public isRequired: Bool3;
    public isVisible: boolean;
    public error?: string;

    public constructor(props: QuestionVmBaseProps) {
        this.store = props.store;
        this.id = props.question.id;
        this.parentId = props.question.parentId;
        this.dOrder = props.question.dOrder;
        this.type = props.question.type;
        this.question = props.question.question;
        this.qExtras = props.question.qExtras;
        this.ansHint = props.question.ansHint;
        this.level = props.question.level;
        this.marks = props.question.marks;
        this.mediaFiles = props.question.mediaFiles;
        this.isRequired = props.question.isRequired;
        this.isVisible = true;
        makeObservable(this, {
            isVisible: observable,
            error: observable,
        });
    }
}
