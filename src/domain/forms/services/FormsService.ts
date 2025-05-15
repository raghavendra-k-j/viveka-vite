import type { ResEither } from "~/core/utils/ResEither";
import type { FormDetail } from "../models/FormDetail";
import type { AppError } from "~/core/error/AppError";
import type { FormRepo } from "~/infra/repos/FormRepo";
import type { QuestionRes } from "../models/QuestionsRes";
import { SubmitFormReq, SubmitFormRes } from "../models/submit/SubmitFormModels";

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


}

