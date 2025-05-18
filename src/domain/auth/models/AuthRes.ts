import { JsonObj } from "~/core/types/Json";
import { AuthUser } from "~/domain/common/models/AuthUser";

export type AuthResProps = {
    user: AuthUser;
}

export class AuthRes {

    public readonly user: AuthUser;

    constructor(props: AuthResProps) {
        this.user = props.user;
    }

    static fromJson(json: JsonObj): AuthRes {
        const authUser = AuthUser.fromJson(json);
        return new AuthRes({
            user: authUser,
        });
    }

}