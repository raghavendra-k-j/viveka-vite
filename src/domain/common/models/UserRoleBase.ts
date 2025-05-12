import { UserRoleType } from "./UserRoleType";

export type UserRoleBaseProps = {
    id: number;
    name: string;
    type: UserRoleType;
    defaultType?: UserRoleType;
};

export class UserRoleBase {
    id: number;
    name: string;
    type: UserRoleType;
    defaultType?: UserRoleType;

    constructor(props: UserRoleBaseProps) {
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.defaultType = props.defaultType;
    }


    get isDefault(): boolean {
        return this.type === this.defaultType;
    }

    get isAdmin(): boolean {
        return this.type === UserRoleType.admin;
    }

    get isUser(): boolean {
        return this.type === UserRoleType.user;
    }
}
