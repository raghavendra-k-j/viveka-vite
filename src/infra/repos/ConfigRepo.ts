import { ResEither } from "~/core/utils/ResEither";
import { BaseApiClient } from "../datasources/BaseApiClient";
import { ApiError } from "../errors/ApiError";
import { OrgConfig } from "~/domain/common/models/OrgConfig";
import type { AxiosInstance } from "axios";

export class ConfigRepo {
    private apiClient: BaseApiClient;


    private get axios(): AxiosInstance {
        return this.apiClient.axios;
    }

    constructor() {
        this.apiClient = BaseApiClient.findInstance();
    }

    public async getOrgConfig(subdomain: string): Promise<ResEither<ApiError, OrgConfig>> {
        try {
            const response = await this.axios.post("/api/v1/config/startup", {
                subdomain: subdomain
            });
            const orgConfig = OrgConfig.deserialize(response.data);
            return ResEither.data(orgConfig);
        }
        catch (error) {
            const apiError = ApiError.fromAny(error);
            return ResEither.error(apiError);
        }
    }

}