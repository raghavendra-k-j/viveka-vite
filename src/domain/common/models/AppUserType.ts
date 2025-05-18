export class AppUserType {
    private static readonly _map = new Map<string, AppUserType>();
    public static readonly guest = new AppUserType("GUEST");
    public static readonly noAuth = new AppUserType("NO_AUTH");
    public static readonly auth = new AppUserType("AUTH");

    private constructor(public readonly type: string) {
        AppUserType._map.set(type, this);
    }

    static fromString(type: string): AppUserType {
        const result = AppUserType._map.get(type);
        if (!result) {
            throw new Error(`Invalid AppUserType: ${type}`);
        }
        return result;
    }

    get isGuest(): boolean {
        return this === AppUserType.guest;
    }

    get isNoAuthUser(): boolean {
        return this === AppUserType.noAuth;
    }

    get isAuthUser(): boolean {
        return this === AppUserType.auth;
    }

    get isRegUser(): boolean {
        return this === AppUserType.auth || this === AppUserType.noAuth;
    }
}