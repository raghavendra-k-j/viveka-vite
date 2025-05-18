import type { ResEither } from "~/core/utils/ResEither";
import type { FormDetail } from "../models/FormDetail";
import type { AppError } from "~/core/error/AppError";
import type { FormRepo } from "~/infra/repos/FormRepo";
import type { QuestionRes } from "../models/QuestionsRes";
import { SubmitFormReq, SubmitFormRes } from "../models/submit/SubmitFormModels";
import { GetAppUserReq } from "../models/submit/GetAppUserReq";
import { GetAppUserRes } from "../models/submit/GetAppUserRes";

export class FormService {

    private formRepo: FormRepo;

    constructor({ formRepo }: { formRepo: FormRepo }) {
        this.formRepo = formRepo;
    }

    async getFormDetail({ permalink }: { permalink: string }): Promise<ResEither<AppError, FormDetail>> {
        const res = await this.formRepo.getFormDetail({ permalink });
        return res;
    }

    async getQuestions({ formId, languageId }: { formId: number; languageId?: string }): Promise<ResEither<AppError, QuestionRes>> {
        const res = await this.formRepo.getQuestions({ formId, languageId });
        return res;
    }


    async submitForm(req: SubmitFormReq): Promise<ResEither<AppError, SubmitFormRes>> {
        const res = await this.formRepo.submitForm(req);
        return res;
    }

    async getAppUser(req: GetAppUserReq): Promise<ResEither<AppError, GetAppUserRes>> {
        const res = await this.formRepo.getAppUser(req);
        return res;
    }

    async verifyGetAppUser({
        formId,
        id,
        otp,
    }: {
        formId: number;
        id: number;
        otp: string;
    }): Promise<ResEither<AppError, GetAppUserRes>> {
        const res = await this.formRepo.verifyGetAppUser({ formId, id, otp });
        return res;
    }

    async resendSubmitFormOtp({ otpId, formId }: { otpId: number; formId: number }): Promise<ResEither<AppError, number>> {
        const res = await this.formRepo.resendSubmitFormOtp({ otpId, formId });
        return res;
    }



}

