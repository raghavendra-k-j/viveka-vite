import { JsonObj } from "~/core/types/Json";

export class EmailOtpStatus {

    public readonly success: boolean;
    public readonly code?: string;
    public readonly message?: string;

    constructor({ status, code, message }: { status: boolean; code?: string; message?: string }) {
        this.success = status;
        this.code = code;
        this.message = message;
    }

    static fromJson(json: JsonObj): EmailOtpStatus {
        return new EmailOtpStatus({
            status: json.status,
            code: json.code,
            message: json.message,
        });
    }

}