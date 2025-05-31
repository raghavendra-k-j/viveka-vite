import { JsonObj } from "~/core/types/Json";
import { Answer } from "../../models/answer/Answer";
import { QExtras } from "../../models/question/QExtras";
import { QuestionLevel } from "../../models/question/QuestionLevel";
import { QuestionType } from "../../models/question/QuestionType";
import { Bool3 } from "~/core/utils/Bool3";
import { QMedia } from "../../models/qmedia/QMedia";

export type QuestionProps = {
    id: number;
    formId: number;
    parentId: number | null;
    dOrder: number;
    type: QuestionType;
    question: string;
    qExtras: QExtras | null;
    answer: Answer | null;
    ansHint: string | null;
    ansExplanation: string | null;
    level: QuestionLevel | null;
    marks: number | null;
    mediaFiles: QMedia[] | null;
    isAiGenerated: Bool3;
    isRequired: Bool3;
    createdAt: Date;
    updatedAt: Date;
    subQuestions: Question[] | null;
    hasCondition: boolean;
};

export class Question {
    id: number;
    formId: number;
    parentId: number | null;
    dOrder: number;
    type: QuestionType;
    question: string;
    qExtras: QExtras | null;
    answer: Answer | null;
    ansHint: string | null;
    ansExplanation: string | null;
    level: QuestionLevel | null;
    marks: number | null;
    mediaFiles: QMedia[];
    isAiGenerated: Bool3;
    isRequired: Bool3;
    createdAt: Date;
    updatedAt: Date;
    subQuestions: Question[] | null;
    hasCondition: boolean;

    constructor(props: QuestionProps) {
        this.id = props.id;
        this.formId = props.formId;
        this.parentId = props.parentId;
        this.dOrder = props.dOrder;
        this.type = props.type;
        this.question = props.question;
        this.qExtras = props.qExtras;
        this.answer = props.answer;
        this.ansHint = props.ansHint;
        this.ansExplanation = props.ansExplanation;
        this.level = props.level;
        this.marks = props.marks;
        this.mediaFiles = props.mediaFiles || [];
        this.isAiGenerated = props.isAiGenerated;
        this.isRequired = props.isRequired;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.subQuestions = props.subQuestions;
        this.hasCondition = props.hasCondition;
    }

    static fromJson(map: JsonObj): Question {
        const type = QuestionType.fromType(map.type)!;
        const qExtras = map.qExtras ? QExtras.fromTypeAndMap(type, map.qExtras) : null;
        const mediaFiles = map.mediaFiles ? map.mediaFiles.map((e: JsonObj) => QMedia.fromJson(e)) : null;
        const answer = map.answer ? (Answer.fromTypeAndQExtrasAndMap({ type: type, qExtras: qExtras || undefined, map: map.answer }) || null) : null;
        const level = map.level ? QuestionLevel.fromLevel(map.level)! : null;
        const subQuestions = map.subQuestions ? map.subQuestions.map((e: any) => Question.fromJson(e)) : null;
        return new Question({
            id: map.id,
            formId: map.formId,
            parentId: map.parentId,
            dOrder: map.dOrder,
            type: type,
            question: map.question,
            qExtras: qExtras,
            answer: answer,
            ansHint: map.ansHint ?? null,
            ansExplanation: map.ansExplanation ?? null,
            level: level,
            marks: map.marks,
            mediaFiles: mediaFiles,
            isAiGenerated: Bool3.bool(map.isAiGenerated),
            isRequired: Bool3.bool(map.isRequired),
            createdAt: new Date(map.createdAt),
            updatedAt: new Date(map.updatedAt),
            subQuestions: subQuestions,
            hasCondition: map.hasCondition,
        });
    }

}