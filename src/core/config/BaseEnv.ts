export type BaseEnvProps = {
    tenant?: string;
    apiSchema: string;
    apiHost: string;
    apiPort: string;
}

export class BaseEnv {

    readonly tenant?: string;
    readonly apiSchema: string;
    readonly apiHost: string;
    readonly apiPort: string;

    private static _instance: BaseEnv | null = null;

    private constructor(props: BaseEnvProps) {
        this.tenant = props.tenant;
        this.apiSchema = props.apiSchema;
        this.apiHost = props.apiHost;
        this.apiPort = props.apiPort;
    }

    get apiBase(): string {
        return `${this.apiSchema}://${this.apiHost}:${this.apiPort}`;
    }

    static get instance(): BaseEnv {
        if (!BaseEnv._instance) {
            throw new Error('BaseEnv not initialized. Call loadEnv() first.');
        }
        return BaseEnv._instance!;
    }

    static async loadFromFile(url: string = "/env.json"): Promise<BaseEnv> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load env file: ${response.statusText}`);
        }
        const json = await response.json();
        BaseEnv._instance = new BaseEnv({
            tenant: json.tenant,
            apiSchema: json.apiSchema,
            apiHost: json.apiHost,
            apiPort: json.apiPort
        });
        return BaseEnv._instance;
    }


}