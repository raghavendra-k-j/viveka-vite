import { Bool3 } from "~/core/utils/Bool3";
import { QExtras } from "./question/QExtras";
import { QuestionLevel } from "./question/QuestionLevel";
import { QuestionType } from "./question/QuestionType";
import type { JsonObj } from "~/core/types/Json";
import { Answer } from "./answer/Answer";
import { MEvaluationStatus } from "./MEvaluationStatus";
import { QMedia } from "./qmedia/QMedia";

export class RDQuestion {
    id: number;
    formId: number;
    parentId?: number;
    dOrder: number;
    type: QuestionType;
    question: string;
    qExtras?: QExtras;
    ansHint?: string;
    level?: QuestionLevel;
    marks?: number;
    mediaFiles?: QMedia[];
    isRequired: Bool3;
    answer?: Answer;
    userAnswer?: Answer;
    ansExplanation?: string;
    gainedMarks?: number;
    parentQuestionText?: string;
    qNumber: number;
    subQNumber?: number;
    mEvaluationStatus?: MEvaluationStatus;

    constructor(props: {
        id: number;
        formId: number;
        parentId?: number;
        dOrder: number;
        type: QuestionType;
        question: string;
        qExtras?: QExtras;
        ansHint?: string;
        level?: QuestionLevel;
        marks?: number;
        mediaFiles?: QMedia[];
        isRequired: Bool3;
        answer?: Answer;
        userAnswer?: Answer;
        ansExplanation?: string;
        gainedMarks?: number;
        parentQuestionText?: string;
        qNumber: number;
        subQNumber?: number;
        mEvaluationStatus?: MEvaluationStatus;
    }) {
        this.id = props.id;
        this.formId = props.formId;
        this.parentId = props.parentId;
        this.dOrder = props.dOrder;
        this.type = props.type;
        this.question = props.question;
        this.qExtras = props.qExtras;
        this.ansHint = props.ansHint;
        this.level = props.level;
        this.marks = props.marks;
        this.mediaFiles = props.mediaFiles;
        this.isRequired = props.isRequired;
        this.answer = props.answer;
        this.userAnswer = props.userAnswer;
        this.ansExplanation = props.ansExplanation;
        this.gainedMarks = props.gainedMarks;
        this.parentQuestionText = props.parentQuestionText;
        this.qNumber = props.qNumber;
        this.subQNumber = props.subQNumber;
        this.mEvaluationStatus = props.mEvaluationStatus;
    }

    static fromJson(json: JsonObj): RDQuestion {
        const type = QuestionType.fromType(json.type)!;

        const qExtras = json.qExtras ? QExtras.fromTypeAndMap(type, json.qExtras) : undefined;

        const level = QuestionLevel.fromLevel(json.level);

        const mediaFiles = json.mediaFiles
            ? json.mediaFiles.map((mediaJson: JsonObj) => QMedia.fromJson(mediaJson))
            : undefined;

        const answer = json.answer ? Answer.fromTypeAndQExtrasAndMap({ type: type, map: json.answer }) : undefined;
        const userAnswer = json.userAnswer ? Answer.fromTypeAndQExtrasAndMap({ type: type, map: json.userAnswer }) : undefined;
        const mEvaluationStatus = MEvaluationStatus.fromString(json.mEvaluationStatus);

        return new RDQuestion({
            id: json.id,
            formId: json.formId,
            parentId: json.parentId,
            dOrder: json.dOrder,
            type: type,
            question: json.question,
            qExtras: qExtras,
            ansHint: json.ansHint,
            level: level,
            marks: json.marks,
            mediaFiles: mediaFiles,
            isRequired: Bool3.bool(json.isRequired),
            answer: answer,
            userAnswer: userAnswer,
            ansExplanation: json.ansExplanation,
            gainedMarks: json.gainedMarks,
            parentQuestionText: json.parentQuestionText,
            qNumber: json.qNumber,
            subQNumber: json.subQNumber,
            mEvaluationStatus: mEvaluationStatus,
        });
    }
}