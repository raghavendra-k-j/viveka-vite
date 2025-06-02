import { JsonObj } from "~/core/types/Json";

export type AuthTokenJson = {
    accessToken: string;
}

export class AuthToken {
    public readonly accessToken: string;

    constructor(props: AuthTokenJson) {
        this.accessToken = props.accessToken;
    }

    static fromJson(json: JsonObj): AuthToken {
        return new AuthToken({
            accessToken: json.accessToken,
        });
    }
}