import { AssmntType } from "./AssmntType";
import { FormAccess, type FormAccessJson } from "./FormAccess";
import { FormAiEval, type FormAiEvalJson } from "./FormAiEval";
import { FormResponse, type FormResponseJson } from "./FormResponse";
import { Language, type LanguageJson } from "./Language";
import { UserFormStatus } from "./UserFormStatus";
import { FormType } from "./FormType";
import { FormStatus } from "./FormStatus";

export type FormDetailJson = {
    id: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    permalink: string;
    status: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    totalQuestions: number;
    timeLimit?: number;
    totalMarks?: number;
    passingMarks?: number;
    shuffle?: boolean;
    languages: LanguageJson[];
    assessmentType?: string;
    verifyGuestEmail?: boolean;
    language: LanguageJson;
    formAccess?: FormAccessJson;
    formResponse?: FormResponseJson;
    formAiEval?: FormAiEvalJson;
};

export type FormDetailProps = {
    id: number;
    type: FormType;
    createdAt: Date;
    updatedAt: Date;
    permalink: string;
    status: FormStatus;
    userFormStatus: UserFormStatus;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    totalQuestions: number;
    timeLimit?: number;
    totalMarks?: number;
    passingMarks?: number;
    shuffle?: boolean;
    languages: Language[];
    assessmentType?: AssmntType;
    verifyGuestEmail?: boolean;
    language: Language;
    formAccess?: FormAccess;
    formResponse?: FormResponse;
    formAiEval?: FormAiEval;
};

export class FormDetail {
    public readonly id: number;
    public readonly type: FormType;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly permalink: string;
    public readonly status: FormStatus;
    public readonly userFormStatus: UserFormStatus;
    public readonly title: string;
    public readonly description?: string;
    public readonly startDate: Date;
    public readonly endDate: Date;
    public readonly totalQuestions: number;
    public readonly timeLimit?: number;
    public readonly totalMarks?: number;
    public readonly passingMarks?: number;
    public readonly shuffle?: boolean;
    public readonly languages: Language[];
    public readonly assessmentType?: AssmntType;
    public readonly verifyGuestEmail?: boolean;
    public readonly language: Language;
    public readonly formAccess?: FormAccess;
    public readonly formResponse?: FormResponse;
    public readonly formAiEval?: FormAiEval;

    constructor({ ...props }: FormDetailProps) {
        this.id = props.id;
        this.type = props.type;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.permalink = props.permalink;
        this.status = props.status;
        this.userFormStatus = props.userFormStatus;
        this.title = props.title;
        this.description = props.description;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.totalQuestions = props.totalQuestions;
        this.timeLimit = props.timeLimit;
        this.totalMarks = props.totalMarks;
        this.passingMarks = props.passingMarks;
        this.shuffle = props.shuffle;
        this.languages = props.languages;
        this.assessmentType = props.assessmentType;
        this.verifyGuestEmail = props.verifyGuestEmail;
        this.language = props.language;
        this.formAccess = props.formAccess;
        this.formResponse = props.formResponse;
        this.formAiEval = props.formAiEval;
    }

    serialize(): FormDetailJson {
        return {
            id: this.id,
            type: this.type.type,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            permalink: this.permalink,
            status: this.status.status,
            title: this.title,
            description: this.description,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            totalQuestions: this.totalQuestions,
            timeLimit: this.timeLimit,
            totalMarks: this.totalMarks,
            passingMarks: this.passingMarks,
            shuffle: this.shuffle,
            languages: this.languages.map(lang => lang.serialize()),
            assessmentType: this.assessmentType?.type,
            verifyGuestEmail: this.verifyGuestEmail,
            language: this.language.serialize(),
            formAccess: this.formAccess?.serialize(),
            formResponse: this.formResponse?.serialize(),
            formAiEval: this.formAiEval?.serialize(),
        };
    }

    static fromJson(json: FormDetailJson): FormDetail {
        const startDate = new Date(json.startDate);
        const endDate = new Date(json.endDate);

        const userFormStatus = UserFormStatus.fromDatesAndResponseId({
            startDate: startDate,
            endDate: endDate,
            responseId: json.formResponse?.id,
        });


        return new FormDetail({
            id: json.id,
            type: FormType.fromType(json.type)!,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            permalink: json.permalink,
            status: FormStatus.fromValue(json.status)!,
            userFormStatus: userFormStatus,
            title: json.title,
            description: json.description,
            startDate: new Date(json.startDate),
            endDate: new Date(json.endDate),
            totalQuestions: json.totalQuestions,
            timeLimit: json.timeLimit,
            totalMarks: json.totalMarks,
            passingMarks: json.passingMarks,
            shuffle: json.shuffle,
            languages: json.languages.map(lang => Language.deserialize(lang)),
            assessmentType: json.assessmentType ? AssmntType.fromType(json.assessmentType) || undefined : undefined,
            verifyGuestEmail: json.verifyGuestEmail,
            language: Language.deserialize(json.language),
            formAccess: json.formAccess ? FormAccess.deserialize(json.formAccess) : undefined,
            formResponse: json.formResponse ? FormResponse.deserialize(json.formResponse) : undefined,
            formAiEval: json.formAiEval ? FormAiEval.deserialize(json.formAiEval) : undefined,
        });
    }


    get isViewed(): boolean | null {
        if (!this.formAccess) return null;
        return this.formAccess.viewedAt != null;
    }

    get hasResponse(): boolean | null {
        if (!this.formResponse) return null;
        return this.formResponse.submittedAt != null;
    }

    get hasTimeLimit(): boolean {
        return this.timeLimit != null && this.timeLimit > 0;
    }

}
