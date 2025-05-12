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
}