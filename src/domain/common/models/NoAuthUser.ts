import { JsonObj } from "~/core/types/Json";
import { AppUserType } from "./AppUserType";
import { RegUser, type RegUserProps } from "./RegUser";
import { UserBase } from "./UserBase";

type NoAuthUserProps = RegUserProps & {

}

export class NoAuthUser extends RegUser {

    constructor(props: NoAuthUserProps) {
        super(props);
    }

    get appUserType(): AppUserType {
        return AppUserType.noAuth;
    }

    static fromJson(json: JsonObj): NoAuthUser {
        return new NoAuthUser({
            base: UserBase.fromJson(json),
        });
    }

}