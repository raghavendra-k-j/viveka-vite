import { JsonObj } from "~/core/types/Json";
import { Question } from "../../models/question/Question";
import { QuestionType } from "../../models/question/QuestionType";
import { QExtras } from "../../models/question/QExtras";
import { QuestionLevel } from "../../models/question/QuestionLevel";
import { Answer } from "../../models/answer/Answer";
import { Bool3 } from "~/core/utils/Bool3";
import { MediaTileRefReq } from "./MediaTileRefReq";

export type UpsertQuestionResProps = {
    question: Question;
}

export class UpsertQuestionRes {
    public readonly question: Question;

    constructor(props: UpsertQuestionResProps) {
        this.question = props.question;
    }

    public static fromMap(map: any): UpsertQuestionRes {
        return new UpsertQuestionRes({
            question: Question.fromJson(map.question),
        });
    }
}


export type UpsertQuestionReqProps = {
    formId: number;
    id?: number;
    parentId?: number;
    type: QuestionType;
    question: string;
    qExtras: QExtras | null;
    answer: Answer | null;
    ansHint?: string;
    ansExplanation?: string;
    marks?: number;
    level?: QuestionLevel;
    isRequired: Bool3;
    isAiGenerated: Bool3;
    mediaRefs?: MediaTileRefReq[];
}

export class UpsertQuestionReq {
    public readonly formId: number;
    public readonly id?: number;
    public readonly parentId?: number;
    public readonly type: QuestionType;
    public readonly question: string;
    public readonly qExtras: QExtras | null;
    public readonly answer: Answer | null;
    public readonly ansHint?: string;
    public readonly ansExplanation?: string;
    public readonly marks?: number;
    public readonly level?: QuestionLevel;
    public readonly isRequired: Bool3;
    public readonly isAiGenerated: Bool3;
    public readonly mediaRefs?: MediaTileRefReq[];

    constructor(props: UpsertQuestionReqProps) {
        this.formId = props.formId;
        this.id = props.id;
        this.parentId = props.parentId;
        this.type = props.type;
        this.question = props.question;
        this.qExtras = props.qExtras;
        this.answer = props.answer;
        this.ansHint = props.ansHint;
        this.ansExplanation = props.ansExplanation;
        this.marks = props.marks;
        this.level = props.level;
        this.isRequired = props.isRequired;
        this.isAiGenerated = props.isAiGenerated;
        this.mediaRefs = props.mediaRefs;
    }

    toJson(): JsonObj {
        return {
            formId: this.formId,
            id: this.id,
            parentId: this.parentId,
            type: this.type.type,
            question: this.question,
            qExtras: this.qExtras?.toJson() || null,
            answer: this.answer?.toJson() || null,
            ansHint: this.ansHint,
            ansExplanation: this.ansExplanation,
            marks: this.marks,
            level: this.level?.level,
            isRequired: this.isRequired.boolValue,
            isAiGenerated: this.isAiGenerated.boolValue,
            mediaRefs: this.mediaRefs?.map((e) => e.toJson()),
        };
    }
}

