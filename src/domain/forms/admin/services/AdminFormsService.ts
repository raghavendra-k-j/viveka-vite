import { AppError } from "~/core/error/AppError";
import { ResEither } from "~/core/utils/ResEither";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { AdminFormRepo } from "~/infra/repos/forms/AdminFormRepo";
import { AdminFormDetail } from "../models/AdminFormDetail";
import { ApiError } from "~/infra/errors/ApiError";
import { UpsertQuestionReq, UpsertQuestionRes } from "~/domain/forms/admin/models/UpsertQuestionModel";
import { AdminQuestionListRes } from "~/domain/forms/admin/models/AdminQuestionListRes";
import { DeleteQuestionDependencies } from "~/domain/forms/admin/models/DeleteQuestionDependencies";

export class AdminFormsService {

    private readonly adminFormRepo: AdminFormRepo;

    constructor() {
        this.adminFormRepo = new AdminFormRepo({ apiClient: ApiClient.findInstance() });
    }

    async getFormDetails({ permalink }: { permalink: string }): Promise<ResEither<AppError, AdminFormDetail>> {
        return await this.adminFormRepo.getFormDetails({ permalink });
    }

    async upsertQuestion(req: UpsertQuestionReq): Promise<ResEither<ApiError, UpsertQuestionRes>> {
        return await this.adminFormRepo.upsertQuestion(req);
    }

    async queryQuestions({ formId, searchQuery }: { formId: number, searchQuery?: string }): Promise<ResEither<ApiError, AdminQuestionListRes>> {
        return await this.adminFormRepo.queryQuestions({ formId, searchQuery });
    }

    async deleteQuestion({ formId, questionId }: { formId: number, questionId: number }): Promise<ResEither<ApiError, void>> {
        return await this.adminFormRepo.deleteQuestion({ formId, questionId });
    }

    async toggleQuestionsMandatory({ formId, mandatory }: { formId: number, mandatory: boolean }): Promise<ResEither<ApiError, void>> {
        return await this.adminFormRepo.toggleQuestionsMandatory({ formId, mandatory });
    }

    async getDeleteDependencies({ formId, questionId }: { formId: number, questionId: number }): Promise<ResEither<ApiError, DeleteQuestionDependencies>> {
        return await this.adminFormRepo.getDeleteDependencies({ formId, questionId });
    }

}