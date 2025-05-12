export class AppUserType {
    private static readonly _map = new Map<string, AppUserType>();
    public static readonly GUEST = new AppUserType("GUEST");
    public static readonly NO_AUTH = new AppUserType("NO_AUTH");
    public static readonly AUTH = new AppUserType("AUTH");

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
        return this === AppUserType.GUEST;
    }

    get isNoAuthUser(): boolean {
        return this === AppUserType.NO_AUTH;
    }

    get isAuthUser(): boolean {
        return this === AppUserType.AUTH;
    }

    get isRegUser(): boolean {
        return this === AppUserType.AUTH || this === AppUserType.NO_AUTH;
    }
}