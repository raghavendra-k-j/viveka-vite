import { JsonObj } from "~/core/types/Json";
import { AssmntType } from "../../models/AssmntType";
import { FormStatus } from "../../models/FormStatus";
import { FormUser } from "../../models/FormUser";
import { FormVisibility } from "../../models/FormVisibility";
import { Language } from "../../models/Language";
import { AssmntTypeRefItem } from "./AssmntTypeRefItem";
import { FormType } from "../../models/FormType";


export type AdminFormDetailProps = {
    id: number;
    type: FormType;
    permalink: string;
    orgId: number;
    shortLink: string;
    creator: FormUser;
    updatedBy: FormUser;
    createdAt: Date;
    updatedAt: Date;
    status: FormStatus;
    language?: Language;
    languages?: Language[];
    verifyGuestEmail?: boolean;
    title: string;
    description?: string;
    tags?: string[];
    startDate?: Date;
    endDate?: Date;
    timeLimit?: number;
    totalQuestions: number;
    totalMarks?: number;
    passingMarks?: number;
    assessmentType?: AssmntType;
    assmntTypeRef?: AssmntTypeRefItem;
    shuffle?: boolean;
    visibility: FormVisibility;
    hold4ManualEval?: boolean;
    evalOeQsWtAi?: boolean;

    totalViews: number;
    totalInvites: number;
    totalResponses: number;
}


export class AdminFormDetail {

    public readonly id: number;
    public readonly type: FormType;
    public readonly permalink: string;
    public readonly orgId: number;
    public readonly shortLink: string;
    public readonly creator: FormUser;
    public readonly updatedBy: FormUser;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly status: FormStatus;
    public readonly language?: Language;
    public readonly languages?: Language[];
    public readonly verifyGuestEmail?: boolean;
    public readonly title: string;
    public readonly description?: string;
    public readonly tags?: string[];
    public readonly startDate?: Date;
    public readonly endDate?: Date;
    public readonly timeLimit?: number;
    public readonly totalQuestions: number;
    public readonly totalMarks?: number;
    public readonly passingMarks?: number;
    public readonly assessmentType?: AssmntType;
    public readonly assmntTypeRef?: AssmntTypeRefItem;
    public readonly shuffle?: boolean;
    public readonly visibility: FormVisibility;
    public readonly hold4ManualEval?: boolean;
    public readonly evalOeQsWtAi?: boolean;
    public readonly totalViews: number;
    public readonly totalInvites: number;
    public readonly totalResponses: number;



    constructor(props: AdminFormDetailProps) {
        this.id = props.id;
        this.type = props.type;
        this.permalink = props.permalink;
        this.orgId = props.orgId;
        this.shortLink = props.shortLink;
        this.creator = props.creator;
        this.updatedBy = props.updatedBy;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.status = props.status;
        this.language = props.language;
        this.languages = props.languages;
        this.verifyGuestEmail = props.verifyGuestEmail;
        this.title = props.title;
        this.description = props.description;
        this.tags = props.tags;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.timeLimit = props.timeLimit;
        this.totalQuestions = props.totalQuestions;
        this.totalMarks = props.totalMarks;
        this.passingMarks = props.passingMarks;
        this.assessmentType = props.assessmentType;
        this.assmntTypeRef = props.assmntTypeRef;
        this.shuffle = props.shuffle;
        this.visibility = props.visibility;
        this.hold4ManualEval = props.hold4ManualEval;
        this.evalOeQsWtAi = props.evalOeQsWtAi;

        this.totalViews = props.totalViews;
        this.totalInvites = props.totalInvites;
        this.totalResponses = props.totalResponses;
    }

    isPublishedOrActive(): boolean {
        if (this.status !== FormStatus.Published) return false;
        if (this.startDate && this.endDate) {
            const now = new Date();
            return now > this.startDate && now < this.endDate;
        }
        return true;
    }


    static fromMap(map: JsonObj): AdminFormDetail {
        const formType = FormType.fromType(map.type)!;
        const creator = FormUser.fromJson(map.creator);
        const updatedBy = FormUser.fromJson(map.updatedBy);
        const createdAt = new Date(map.createdAt);
        const updatedAt = new Date(map.updatedAt);
        const status = FormStatus.fromValue(map.status);
        const language = map.language ? Language.fromJson(map.language) : undefined;
        const languages = map.languages ? map.languages.map((lang: JsonObj) => Language.fromJson(lang)) : undefined;
        const startDate = map.startDate ? new Date(map.startDate) : undefined;
        const endDate = map.endDate ? new Date(map.endDate) : undefined;
        const assessmentType = map.assessmentType ? AssmntType.fromType(map.assessmentType) : undefined;
        const assmntTypeRef = map.assmntTypeRef ? AssmntTypeRefItem.fromJson(map.assmntTypeRef) : undefined;
        const visibility = FormVisibility.fromVisibility(map.visibility)!;

        return new AdminFormDetail({
            id: map.id,
            type: formType,
            permalink: map.permalink,
            orgId: map.orgId,
            shortLink: map.shortLink,
            creator,
            updatedBy,
            createdAt,
            updatedAt,
            status,
            language,
            languages,
            verifyGuestEmail: map.verifyGuestEmail,
            title: map.title,
            description: map.description,
            tags: map.tags,
            startDate,
            endDate,
            timeLimit: map.timeLimit,
            totalQuestions: map.totalQuestions,
            totalMarks: map.totalMarks,
            passingMarks: map.passingMarks,
            assessmentType,
            assmntTypeRef,
            shuffle: map.shuffle,
            visibility,
            hold4ManualEval: map.hold4ManualEval,
            evalOeQsWtAi: map.evalOeQsWtAi,
            totalViews: map.totalViews,
            totalInvites: map.totalInvites,
            totalResponses: map.totalResponses,
        });
    }

}