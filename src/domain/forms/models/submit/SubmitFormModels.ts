import { JsonObj } from "~/core/types/Json";
import type { SubmitFormQuestion } from "../SubmitFormQuestion";
import { FormResponse } from "../FormResponse";

export class SubmitFormReq {
    formId: number;
    submittedLanguageId: string;
    startedOn: Date;
    endedOn: Date;
    questions: SubmitFormQuestion[];

    constructor(params: {
        formId: number;
        submittedLanguageId: string;
        startedOn: Date;
        endedOn: Date;
        questions: SubmitFormQuestion[];
    }) {
        this.formId = params.formId;
        this.submittedLanguageId = params.submittedLanguageId;
        this.startedOn = params.startedOn;
        this.endedOn = params.endedOn;
        this.questions = params.questions;
    }

    toJson(): JsonObj {
        return {
            formId: this.formId,
            submittedLanguageId: this.submittedLanguageId,
            questions: this.questions.map(q => q.toJson()),
            startedOn: this.startedOn.toISOString(),
            endedOn: this.endedOn.toISOString(),
        };
    }
}


export class SubmitFormRes {

    public formResponse: FormResponse;

    constructor(params: { formResponse: FormResponse }) {
        this.formResponse = params.formResponse;
    }

    static deserialize(json: JsonObj): SubmitFormRes {
        return new SubmitFormRes({
            formResponse: FormResponse.deserialize(json.formResponse),
        });
    }
}