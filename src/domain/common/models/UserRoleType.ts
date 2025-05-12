export class UserRoleType {
    readonly label: string;
    readonly value: string;

    private constructor({ label, value }: { label: string; value: string }) {
        this.label = label;
        this.value = value;
    }

    static readonly admin = new UserRoleType({
        label: "Admin",
        value: "ADMIN",
    });

    static readonly user = new UserRoleType({
        label: "User",
        value: "USER",
    });

    static readonly values = Object.freeze([UserRoleType.admin, UserRoleType.user]);

    static fromString(value: string): UserRoleType {
        const userRole = UserRoleType.values.find(role => role.value === value);
        if (!userRole) {
            throw new Error(`Unknown UserRoleType value: ${value}`);
        }
        return userRole;
    }
}
