import { logger } from "../utils/logger";
import type { BaseEnv } from "./BaseEnv";
import { CurrentURL } from "./CurrentURL";

export type AppEnvProps = {
    tenant: string;
    apiSchema: string;
    apiHost: string;
    apiPort: string;
    webBase: string;
};

export type AppEnvJson = AppEnvProps;

export class AppEnv {
    readonly tenant: string;
    readonly apiSchema: string;
    readonly apiHost: string;
    readonly apiPort: string;
    readonly apiBase: string;
    readonly webBase: string;

    public static instance: AppEnv;

    constructor(props: AppEnvProps) {
        this.tenant = props.tenant;
        this.apiSchema = props.apiSchema;
        this.apiHost = props.apiHost;
        this.apiPort = props.apiPort;
        this.apiBase = `${props.apiSchema}://${props.apiHost}:${props.apiPort}`;
        this.webBase = props.webBase;
        logger.debug("AppEnv", this.webBase);
    }

    static fromBaseEnv(baseEnv: BaseEnv, requestURL: string): AppEnv {
        const currentURL = CurrentURL.fromURL(requestURL);
        const instance = new AppEnv({
            tenant: baseEnv.tenant || currentURL.subdomain || "test",
            apiSchema: baseEnv.apiSchema,
            apiHost: baseEnv.apiHost,
            apiPort: baseEnv.apiPort,
            webBase: currentURL.webBase
        });
        this.instance = instance;
        return instance;
    }
}

