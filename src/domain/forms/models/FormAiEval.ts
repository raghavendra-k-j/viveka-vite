import { JsonObj } from "~/core/types/Json";
import { AiEvalStatus } from "./AiEvalStatus";


export type FormAiEvalParams = {
    id: number;
    responseId: number;
    status: AiEvalStatus;
    statusDate: Date;
    statusMessage?: string;
};

export class FormAiEval {
    id: number;
    responseId: number;
    status: AiEvalStatus;
    statusDate: Date;
    statusMessage?: string;

    constructor({ id, responseId, status, statusDate, statusMessage }: FormAiEvalParams) {
        this.id = id;
        this.responseId = responseId;
        this.status = status;
        this.statusDate = statusDate;
        this.statusMessage = statusMessage;
    }

    static fromJson(json: JsonObj): FormAiEval {
        return new FormAiEval({
            id: json.id,
            responseId: json.responseId,
            status: AiEvalStatus.fromValue(json.status),
            statusDate: new Date(json.statusDate),
            statusMessage: json.statusMessage
        });
    }
}
