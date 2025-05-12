import { ResEither } from "~/core/utils/ResEither";
import type { ApiClient } from "../datasources/ApiClient";
import { ApiError } from "../errors/ApiError";
import { FormDetail } from "~/domain/forms/models/FormDetail";
import { logger } from "~/core/utils/logger";
import { QuestionRes } from "~/domain/forms/models/QuestionsRes";

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
            const formDetail = FormDetail.deserialize(response.data);
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


}