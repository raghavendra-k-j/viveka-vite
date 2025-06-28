import { JsonObj } from "~/core/types/Json";
import { AuthUser } from "~/domain/common/models/AuthUser";
import { AuthToken } from "./AccessToken";

export type AutoLoginResProps = {
    user: AuthUser;
    authToken: AuthToken;
}

export class AutoLoginRes {

    public readonly user: AuthUser;
    public readonly authToken: AuthToken;

    constructor(props: AutoLoginResProps) {
        this.user = props.user;
        this.authToken = props.authToken;
    }

    static fromJson(json: JsonObj): AutoLoginRes {
        return new AutoLoginRes({
            user: AuthUser.fromJson(json.user),
            authToken: AuthToken.fromJson(json.authToken),
        });
    }

}