import { AppUserType } from "./AppUserType";
import { RegUser, type RegUserProps } from "./RegUser";

type NoAuthUserProps = RegUserProps & {

}

export class NoAuthUser extends RegUser {

    constructor(props: NoAuthUserProps) {
        super(props);
    }

    getAppUserType(): AppUserType {
        return AppUserType.NO_AUTH;
    }

}