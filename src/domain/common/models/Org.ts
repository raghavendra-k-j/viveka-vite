export type OrgJson = {
    id: number;
    subdomain: string;
    name: string;
    logoUrl?: string;
    createdAt: string;
};

export class Org {
    private _id: number;
    private _subdomain: string;
    private _name: string;
    private _logoUrl?: string;
    private _createdAt: Date;

    constructor({
        id,
        subdomain,
        name,
        logoUrl,
        createdAt,
    }: {
        id: number;
        subdomain: string;
        name: string;
        logoUrl?: string;
        createdAt: Date;
    }) {
        this._id = id;
        this._subdomain = subdomain;
        this._name = name;
        this._logoUrl = logoUrl;
        this._createdAt = createdAt;
    }

    get id(): number {
        return this._id;
    }

    get subdomain(): string {
        return this._subdomain;
    }

    get name(): string {
        return this._name;
    }

    get logoUrl(): string | undefined {
        return this._logoUrl;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get hasLogoUrl(): boolean {
        return this._logoUrl !== undefined;
    }


    setLogoUrl(url?: string): void {
        this._logoUrl = url;
    }


    public serialize(): OrgJson {
        return {
            id: this._id,
            subdomain: this._subdomain,
            name: this._name,
            logoUrl: this._logoUrl,
            createdAt: this._createdAt.toISOString(),
        };
    }

    public static deserialize(json: OrgJson): Org {
        return new Org({
            id: json.id,
            subdomain: json.subdomain,
            name: json.name,
            logoUrl: json.logoUrl,
            createdAt: new Date(json.createdAt),
        });
    }
}