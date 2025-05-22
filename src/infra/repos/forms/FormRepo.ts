import { ResEither } from "~/core/utils/ResEither";
import type { ApiClient } from "../../datasources/ApiClient";
import { ApiError } from "../../errors/ApiError";
import { FormDetail } from "~/domain/forms/models/FormDetail";
import { logger } from "~/core/utils/logger";
import { QuestionRes } from "~/domain/forms/models/QuestionsRes";
import { SubmitFormReq, SubmitFormRes } from "~/domain/forms/models/submit/SubmitFormModels";
import { GetAppUserRes } from "~/domain/forms/models/submit/GetAppUserRes";
import { GetAppUserReq } from "~/domain/forms/models/submit/GetAppUserReq";
import { FormResponseDetail } from "~/domain/forms/models/FormResponseDetail";
import { RDQuestionsReq } from "~/domain/forms/models/RDQuestionsReq";
import { RDQuestionsRes } from "~/domain/forms/models/RDQuestionsRes";

export class FormRepo {

    private apiClient: ApiClient;

    constructor({ apiClient }: { apiClient: ApiClient }) {
        this.apiClient = apiClient;
    }

    get axios() {
        return this.apiClient.axios;
    }

    async getFormDetail({ permalink }: { permalink: string }): Promise<ResEither<ApiError, FormDetail>> {
        try {
            const response = await this.axios.get(`/api/v1/forms/${permalink}`);
            const formDetail = FormDetail.fromJson(response.data);
            return ResEither.data(formDetail);
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }

    async getQuestions(
        { formId, languageId }: { formId: number; languageId?: string }
    ): Promise<ResEither<ApiError, QuestionRes>> {
        try {
            const queryParams = languageId ? { languageId } : undefined;
            const response = await this.axios.get(`api/v1/forms/${formId}/questions`, { params: queryParams });
            const questionsRes = QuestionRes.deserialize(response.data);
            return ResEither.data(questionsRes);
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in getQuestions:", { error: apiError, formId, languageId });
            return ResEither.error(apiError);
        }
    }


    async submitForm(req: SubmitFormReq): Promise<ResEither<ApiError, SubmitFormRes>> {
        try {
            const response = await this.axios.post(`/api/v1/forms/${req.formId}/submit`, req.toJson());
            const formResponse = SubmitFormRes.deserialize(response.data);
            return ResEither.data(formResponse);
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in submitForm:", { error: apiError, req });
            return ResEither.error(apiError);
        }
    }

    async getAppUser(req: GetAppUserReq): Promise<ResEither<ApiError, GetAppUserRes>> {
        try {
            const response = await this.axios.post(
                `/api/v1/forms/${req.formId}/submit/get-app-user`,
                req.toJson()
            );
            return ResEither.data(GetAppUserRes.fromJson(response.data));
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in getAppUser:", { error: apiError, req });
            return ResEither.error(apiError);
        }
    }


    async verifyGetAppUser({
        formId,
        id,
        otp,
    }: {
        formId: number;
        id: number;
        otp: string;
    }): Promise<ResEither<ApiError, GetAppUserRes>> {
        try {
            const data = { id, otp };
            const response = await this.axios.post(`/api/v1/forms/${formId}/submit/verify-get-app-user`, data);
            return ResEither.data(GetAppUserRes.fromJson(response.data));
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in verifyGetAppUser:", { error: apiError, formId, id, otp });
            return ResEither.error(apiError);
        }
    }


    async resendSubmitFormOtp({ otpId, formId }: { otpId: number; formId: number }): Promise<ResEither<ApiError, number>> {
        try {
            const data = { id: otpId, formId };
            const response = await this.axios.post(`/api/v1/forms/${formId}/submit/resend-otp`, data);
            const id = response.data['id'];
            return ResEither.data(id);
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in resendSubmitFormOtp:", { error: apiError, otpId, formId });
            return ResEither.error(apiError);
        }
    }


    async getFormResponseDetail({ formId, responseUid, }: { formId: number; responseUid: string; }): Promise<ResEither<ApiError, FormResponseDetail>> {
        try {
            const response = await this.axios.get(`/api/v1/forms/${formId}/responses/${responseUid}`);
            const detail = FormResponseDetail.fromJson(response.data);
            logger.debug("Form response detail:", { detail });
            return ResEither.data(detail);
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }

    async getFormResponseDetailQuestions(req: RDQuestionsReq): Promise<ResEither<ApiError, RDQuestionsRes>> {
        try {
            const params = req.toJson();
            const response = await this.axios.get(
                `/api/v1/forms/${req.formId}/responses/${req.responseUid}/questions`,
                { params }
            );
            const questionsRes = RDQuestionsRes.fromJson(response.data);
            return ResEither.data(questionsRes);
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in getFormResponseDetailQuestions:", error);
            return ResEither.error(apiError);
        }
    }




}