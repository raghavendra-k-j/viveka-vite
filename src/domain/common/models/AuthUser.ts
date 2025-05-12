import { AppUserType } from "./AppUserType";
import { RegUser, type RegUserProps } from "./RegUser";
import { UserRoleBase } from "./UserRoleBase";
import { PermissionBase } from "./PermissionBase";

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
        return AppUserType.AUTH;
    }

    hasPermission(id: string): boolean {
        return this._permissionIds.has(id);
    }
}
