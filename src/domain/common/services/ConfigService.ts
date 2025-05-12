import type { AppError } from "~/core/error/AppError";
import type { ResEither } from "~/core/utils/ResEither";
import { ConfigRepo } from "~/infra/repos/ConfigRepo";
import type { OrgConfig } from "../models/OrgConfig";

export class ConfigService {

    private repo: ConfigRepo;

    constructor() {
        this.repo = new ConfigRepo();
    }

    public async getOrgConfig(subdomain: string): Promise<ResEither<AppError, OrgConfig>> {
        return await this.repo.getOrgConfig(subdomain);
    }
}

