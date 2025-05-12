import { UserBase, type UserBaseJson } from "~/domain/common/models/UserBase";
import { EvaluationType } from "./EvaluationType";
import { FormUser, type FormUserJson } from "./FormUser";
import { Language, type LanguageJson } from "./Language";
import { GuestBase, type GuestBaseJson } from "~/domain/common/models/GuestBase";

export type FormResponseJson = {
    id: number;
    uid: string;
    submittedLanguage: LanguageJson;
    submittedAt: string;
    startedAt: string;
    endedAt: string;
    isEvaluated: boolean | null;
    evaluationType: string | null;
    evaluatedOn: string | null;
    evaluator: FormUserJson | null;
    timeTaken: number;
    marks: number | null;
    percentage: number | null;
    attemptedQCount: number;
    correctQCount: number | null;
    incorrectQCount: number | null;
    partiallyCorrectQCount: number | null;
    updatedAt: string;
    user: UserBaseJson | null;
    guest: GuestBaseJson | null;
    [key: string]: any;
};


export type FormResponseProps = {
    id: number;
    uid: string;
    submittedLanguage: Language;
    submittedAt: Date;
    startedAt: Date;
    endedAt: Date;
    isEvaluated: boolean | null;
    evaluationType: EvaluationType | null;
    evaluatedOn: Date | null;
    evaluator: FormUser | null;
    timeTaken: number;
    marks: number | null;
    percentage: number | null;
    attemptedQCount: number;
    correctQCount: number | null;
    incorrectQCount: number | null;
    partiallyCorrectQCount: number | null;
    updatedAt: Date;
    user: UserBase | null;
    guest: GuestBase | null;
};

export class FormResponse {
    constructor({
        id,
        uid,
        submittedLanguage,
        submittedAt,
        startedAt,
        endedAt,
        isEvaluated,
        evaluationType,
        evaluatedOn,
        evaluator,
        timeTaken,
        marks,
        percentage,
        attemptedQCount,
        correctQCount,
        incorrectQCount,
        partiallyCorrectQCount,
        updatedAt,
        user,
        guest
    }: FormResponseProps) {
        this.id = id;
        this.uid = uid;
        this.submittedLanguage = submittedLanguage;
        this.submittedAt = submittedAt;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.isEvaluated = isEvaluated;
        this.evaluationType = evaluationType;
        this.evaluatedOn = evaluatedOn;
        this.evaluator = evaluator;
        this.timeTaken = timeTaken;
        this.marks = marks;
        this.percentage = percentage;
        this.attemptedQCount = attemptedQCount;
        this.correctQCount = correctQCount;
        this.incorrectQCount = incorrectQCount;
        this.partiallyCorrectQCount = partiallyCorrectQCount;
        this.updatedAt = updatedAt;
        this.user = user;
        this.guest = guest;
    }

    readonly id: number;
    readonly uid: string;
    readonly submittedLanguage: Language;
    readonly submittedAt: Date;
    readonly startedAt: Date;
    readonly endedAt: Date;
    readonly isEvaluated: boolean | null;
    readonly evaluationType: EvaluationType | null;
    readonly evaluatedOn: Date | null;
    readonly evaluator: FormUser | null;
    readonly timeTaken: number;
    readonly marks: number | null;
    readonly percentage: number | null;
    readonly attemptedQCount: number;
    readonly correctQCount: number | null;
    readonly incorrectQCount: number | null;
    readonly partiallyCorrectQCount: number | null;
    readonly updatedAt: Date;
    readonly user: UserBase | null;
    readonly guest: GuestBase | null;

    static deserialize(json: FormResponseJson): FormResponse {
        const parseDate = (s: string | null) => (s ? new Date(s) : null);

        return new FormResponse({
            id: json.id,
            uid: json.uid,
            submittedLanguage: Language.deserialize(json.submittedLanguage),
            submittedAt: new Date(json.submittedAt),
            startedAt: new Date(json.startedAt),
            endedAt: new Date(json.endedAt),
            isEvaluated: json.isEvaluated,
            evaluationType: json.evaluationType ? EvaluationType.fromType(json.evaluationType) : null,
            evaluatedOn: parseDate(json.evaluatedOn),
            evaluator: json.evaluator ? FormUser.deserialize(json.evaluator) : null,
            timeTaken: json.timeTaken,
            marks: json.marks,
            percentage: json.percentage,
            attemptedQCount: json.attemptedQCount,
            correctQCount: json.correctQCount,
            incorrectQCount: json.incorrectQCount,
            partiallyCorrectQCount: json.partiallyCorrectQCount,
            updatedAt: new Date(json.updatedAt),
            user: (json.user ?? json.userTile) ? UserBase.deserialize(json.user ?? json.userTile) : null,
            guest: (json.guest ?? json.guestTile) ? GuestBase.deserialize(json.guest ?? json.guestTile) : null
        });
    }

    serialize(): FormResponseJson {
        return {
            id: this.id,
            uid: this.uid,
            submittedLanguage: this.submittedLanguage.serialize(),
            submittedAt: this.submittedAt.toISOString(),
            startedAt: this.startedAt.toISOString(),
            endedAt: this.endedAt.toISOString(),
            isEvaluated: this.isEvaluated,
            evaluationType: this.evaluationType ? this.evaluationType.type : null,
            evaluatedOn: this.evaluatedOn ? this.evaluatedOn.toISOString() : null,
            evaluator: this.evaluator ? this.evaluator.serialize() : null,
            timeTaken: this.timeTaken,
            marks: this.marks,
            percentage: this.percentage,
            attemptedQCount: this.attemptedQCount,
            correctQCount: this.correctQCount,
            incorrectQCount: this.incorrectQCount,
            partiallyCorrectQCount: this.partiallyCorrectQCount,
            updatedAt: this.updatedAt.toISOString(),
            user: this.user ? this.user.serialize() : null,
            guest: this.guest ? this.guest.serialize() : null
        };
    }
}