import { JsonObj } from "~/core/types/Json";
import { ResEither } from "~/core/utils/ResEither";
import { QMedia } from "~/domain/forms/models/qmedia/QMedia";
import { QMediaType } from "~/domain/forms/models/qmedia/QMediaType";
import { QueryQMediaResponse } from "~/domain/forms/models/qmedia/QueryQMediaResponse";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { ApiError } from "~/infra/errors/ApiError";

export class QMediaRepo {

    public readonly apiClient: ApiClient;

    constructor() {
        this.apiClient = ApiClient.findInstance();
    }

    get axios() {
        return this.apiClient.axios;
    }

    async getQMedia(id: number): Promise<ResEither<ApiError, QMedia>> {
        try {
            const response = await this.apiClient.axios.get(`/api/v1/admin/qmedia/${id}`);
            return ResEither.data(QMedia.fromJson(response.data));
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }

    async queryQMedia({ searchQuery, page, pageSize, types }: {
        searchQuery?: string;
        page?: number;
        pageSize?: number;
        types?: QMediaType[]
    }): Promise<ResEither<ApiError, QueryQMediaResponse>> {
        const data: JsonObj = {};
        if (searchQuery) data['searchQuery'] = searchQuery;
        if (page) data['page'] = page;
        if (pageSize) data['pageSize'] = pageSize;
        if (types) data['types'] = types.map((type) => type.type);

        try {
            const response = await this.axios.post('/api/v1/admin/qmedia/', data);
            return ResEither.data(QueryQMediaResponse.fromMap(response.data));
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }


    async deleteQMedia(id: number): Promise<ResEither<ApiError, void>> {
        try {
            await this.apiClient.axios.delete(`/api/v1/admin/qmedia/${id}`);
            return ResEither.data(undefined);
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }

    async createQMedia(file: File): Promise<ResEither<ApiError, QMedia>> {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await this.apiClient.axios.post('/api/v1/admin/qmedia', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return ResEither.data(QMedia.fromJson(response.data));
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }
}