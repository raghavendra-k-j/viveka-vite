import { RDQuestion } from "~/domain/forms/models/RDQuestion";
import { ResponseViewStore } from "../ResponseViewStore";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { QExtras } from "~/domain/forms/models/question/QExtras";
import { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";
import { QMedia } from "~/domain/forms/models/question/QMedia";
import { Bool3 } from "~/core/utils/Bool3";
import { Answer } from "~/domain/forms/models/answer/Answer";
import { MEvaluationStatus } from "~/domain/forms/models/MEvaluationStatus";

export type RDQuestionVmProps = {
    question: RDQuestion;
    storeRef: ResponseViewStore;
}

export class RDQuestionVm {
    public readonly id: number;
    public readonly formId: number;
    public readonly parentId?: number;
    public readonly dOrder: number;
    public readonly type: QuestionType;
    public readonly question: string;
    public readonly qExtras?: QExtras;
    public readonly ansHint?: string;
    public readonly level?: QuestionLevel;
    public readonly marks?: number;
    public readonly mediaFiles?: QMedia[];
    public readonly isRequired: Bool3;
    public readonly answer?: Answer;
    public readonly userAnswer?: Answer;
    public readonly ansExplanation?: string;
    public readonly gainedMarks?: number;
    public readonly parentQuestionText?: string;
    public readonly qNumber: number;
    public readonly subQNumber?: number;
    public readonly mEvaluationStatus?: MEvaluationStatus;
    public readonly storeRef: ResponseViewStore;

    constructor(props: RDQuestionVmProps) {
        const q = props.question;
        this.id = q.id;
        this.formId = q.formId;
        this.parentId = q.parentId;
        this.dOrder = q.dOrder;
        this.type = q.type;
        this.question = q.question;
        this.qExtras = q.qExtras;
        this.ansHint = q.ansHint;
        this.level = q.level;
        this.marks = q.marks;
        this.mediaFiles = q.mediaFiles;
        this.isRequired = q.isRequired;
        this.answer = q.answer;
        this.userAnswer = q.userAnswer;
        this.ansExplanation = q.ansExplanation;
        this.gainedMarks = q.gainedMarks;
        this.parentQuestionText = q.parentQuestionText;
        this.qNumber = q.qNumber;
        this.subQNumber = q.subQNumber;
        this.mEvaluationStatus = q.mEvaluationStatus;
        this.storeRef = props.storeRef;
    }
}