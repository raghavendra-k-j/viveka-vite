import { AppUserType } from "./AppUserType";
import { RegUser, type RegUserProps } from "./RegUser";
import { UserRoleBase } from "./UserRoleBase";
import { PermissionBase } from "./PermissionBase";
import { JsonObj } from "~/core/types/Json";
import { UserBase } from "./UserBase";

type AuthUserProps = RegUserProps & {
    role: UserRoleBase;
    permissions: PermissionBase[];
};

export class AuthUser extends RegUser {
    role: UserRoleBase;
    permissions: PermissionBase[];
    private _permissionIds: Set<string> = new Set();

    constructor(props: AuthUserProps) {
        super(props);
        this.role = props.role;
        this.permissions = props.permissions;
        this.permissions.forEach((permission) => {
            this._permissionIds.add(permission.id);
        });
    }

    get permissionIds(): Set<string> {
        return this._permissionIds;
    }

    getAppUserType(): AppUserType {
        return AppUserType.auth;
    }

    hasPermission(id: string): boolean {
        return this._permissionIds.has(id);
    }

    get appUserType(): AppUserType {
        return AppUserType.auth;
    }

    static fromJson(json: JsonObj): AuthUser {
        return new AuthUser({
            base: UserBase.fromJson(json),
            role: UserRoleBase.fromJson(json.role),
            permissions: json.permissions.map((p: JsonObj) => PermissionBase.fromJson(p)),
        });
    }


}
