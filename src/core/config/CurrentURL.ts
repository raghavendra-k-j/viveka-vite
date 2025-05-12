export class CurrentURL {

    readonly subdomain?: string;
    readonly schema: string;
    readonly host: string;
    readonly port?: string;
    readonly webBase: string;

    constructor({ subdomain, schema, host, port, webBase }: {
        subdomain?: string;
        schema: string;
        host: string;
        port?: string;
        webBase: string;
    }) {
        this.subdomain = subdomain;
        this.schema = schema;
        this.host = host;
        this.port = port;
        this.webBase = webBase;
    }

    static fromURL(urlString: string): CurrentURL {
        const url = new URL(urlString);
        const schema = url.protocol.replace(":", "");
        const host = url.hostname;
        const port = url.port || undefined;

        let subdomain: string | undefined = undefined;
        let webBase = `${schema}://${host}`;

        if (port && !(schema === 'http' && port === '80') && !(schema === 'https' && port === '443')) {
            webBase = `${schema}://${host}:${port}`;
        }

        const hostParts = host.split('.');

        if (hostParts.length > 2) {
            subdomain = hostParts[0];
        }

        return new CurrentURL({
            subdomain,
            schema,
            host,
            port,
            webBase,
        });
    }
}
