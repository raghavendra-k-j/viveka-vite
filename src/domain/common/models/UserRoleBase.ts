import { UserRoleType } from "./UserRoleType";
import { JsonObj } from "~/core/types/Json";

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

    static fromJson(json: JsonObj): UserRoleBase {
        return new UserRoleBase({
            id: json.id,
            name: json.name,
            type: UserRoleType.fromString(json.type),
            defaultType: json.defaultType ? UserRoleType.fromString(json.defaultType) : undefined,
        });
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
