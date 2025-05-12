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

    constructor(props: AppEnvProps) {
        this.tenant = props.tenant;
        this.apiSchema = props.apiSchema;
        this.apiHost = props.apiHost;
        this.apiPort = props.apiPort;
        this.apiBase = `${props.apiSchema}://${props.apiHost}:${props.apiPort}`;
        this.webBase = props.webBase;
    }

    static fromBaseEnv(baseEnv: BaseEnv, requestURL: string): AppEnv {
        const currentURL = CurrentURL.fromURL(requestURL);
        return new AppEnv({
            tenant: baseEnv.tenant || currentURL.subdomain || "test",
            apiSchema: baseEnv.apiSchema,
            apiHost: baseEnv.apiHost,
            apiPort: baseEnv.apiPort,
            webBase: currentURL.webBase
        });
    }

    static async loadFromFile(url: string = "/env.json"): Promise<AppEnv> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load env file: ${response.statusText}`);
        }
        const json = await response.json();
        return AppEnv.deserialize(json);
    }

    serialize(): AppEnvJson {
        return {
            tenant: this.tenant,
            apiSchema: this.apiSchema,
            apiHost: this.apiHost,
            apiPort: this.apiPort,
            webBase: this.webBase
        };
    }

    static deserialize(props: AppEnvJson): AppEnv {
        return new AppEnv({
            tenant: props.tenant,
            apiSchema: props.apiSchema,
            apiHost: props.apiHost,
            apiPort: props.apiPort,
            webBase: props.webBase
        });
    }


}

