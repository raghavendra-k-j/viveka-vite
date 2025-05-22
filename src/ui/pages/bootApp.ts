import { AppEnv } from "~/core/config/AppEnv";
import { BaseEnv } from "~/core/config/BaseEnv";
import { CurrentURL } from "~/core/config/CurrentURL";
import { logger } from "~/core/utils/logger";
import { OrgConfig } from "~/domain/common/models/OrgConfig";
import { ConfigService } from "~/domain/common/services/ConfigService";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { BaseApiClient } from "~/infra/datasources/BaseApiClient";

let hasBooted = false;
let orgConfigData: OrgConfig | null = null;

export async function bootApp(): Promise<void> {
    if (hasBooted) return;
    logger.debug("Booting app...");


    // Create App Env
    await BaseEnv.loadFromFile();
    const currentURL = CurrentURL.fromURL(window.location.href);
    const appEnv = AppEnv.fromBaseEnv(BaseEnv.instance, currentURL.webBase);

    // Create Api Clients
    BaseApiClient.createInstace({ baseURL: appEnv.apiBase });
    ApiClient.createInstace({ baseURL: appEnv.apiBase });

    // Create Config Service
    const configService = new ConfigService();
    orgConfigData = (await configService.getOrgConfig(appEnv.tenant)).data;

    hasBooted = true;
}

export function getOrgConfig(): OrgConfig {
    if (!orgConfigData) {
        throw new Error("OrgConfig is not initialized. Call bootApp() first.");
    }
    return orgConfigData;
}
