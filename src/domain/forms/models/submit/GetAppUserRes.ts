import { JsonObj } from "~/core/types/Json";
import { AbsUser } from "~/domain/common/models/AbsUser";
import { AppUserType } from "~/domain/common/models/AppUserType";
import { AuthToken } from "~/domain/common/models/AuthToken";
import { AuthUser } from "~/domain/common/models/AuthUser";
import { GuestUser } from "~/domain/common/models/GuestUser";
import { NoAuthUser } from "~/domain/common/models/NoAuthUser";

export enum GetAppUserResType {
    AppUserRetrieved = "APP_USER_RETRIEVED",
    AppUserEmailVerificationRequired = "APP_USER_EMAIL_VERIFICATION_REQUIRED",
    GuestRetrieved = "GUEST_RETRIEVED",
    GuestEmailVerificationRequired = "GUEST_EMAIL_VERIFICATION_REQUIRED",
    GuestCreated = "GUEST_CREATED",
    GuestCreatedEmailVerificationRequired = "GUEST_CREATED_EMAIL_VERIFICATION_REQUIRED",
}

type GetAppUserResData = GetAppUserSuccessRes | any;

export class GetAppUserRes {
    readonly type: GetAppUserResType;
    readonly data: GetAppUserResData;

    constructor(params: { type: GetAppUserResType; data: GetAppUserResData }) {
        this.type = params.type;
        this.data = params.data;
    }

    static fromJson(json: { type: string; data: any }): GetAppUserRes {
        const type = json.type as GetAppUserResType;
        let data: GetAppUserResData;

        switch (type) {
            case GetAppUserResType.AppUserRetrieved:
            case GetAppUserResType.GuestCreated:
            case GetAppUserResType.GuestRetrieved:
                data = GetAppUserSuccessRes.fromJson(json.data);
                break;

            case GetAppUserResType.AppUserEmailVerificationRequired:
            case GetAppUserResType.GuestEmailVerificationRequired:
            case GetAppUserResType.GuestCreatedEmailVerificationRequired:
                data = json.data;
                break;

            default:
                throw new Error(`Unknown response type: ${type}`);
        }

        return new GetAppUserRes({ type, data });
    }

    get isAppUserType(): boolean {
        return [
            GetAppUserResType.AppUserRetrieved,
            GetAppUserResType.GuestRetrieved,
            GetAppUserResType.GuestCreated,
        ].includes(this.type);
    }

    get isEmailVerificationRequired(): boolean {
        return [
            GetAppUserResType.AppUserEmailVerificationRequired,
            GetAppUserResType.GuestEmailVerificationRequired,
            GetAppUserResType.GuestCreatedEmailVerificationRequired,
        ].includes(this.type);
    }
}

export class GetAppUserSuccessRes {
    readonly user: AbsUser;
    readonly authToken: AuthToken;

    constructor(params: { user: AbsUser; authToken: AuthToken }) {
        this.user = params.user;
        this.authToken = params.authToken;
    }

    static fromJson(json: JsonObj): GetAppUserSuccessRes {
        const userJson = json.user;
        const appUserType = AppUserType.fromString(userJson.type);

        let user: AbsUser;
        if (appUserType.isGuest) {
            user = GuestUser.fromJson(userJson);
        } else if (appUserType.isAuthUser) {
            user = AuthUser.fromJson(userJson);
        } else if (appUserType.isNoAuthUser) {
            user = NoAuthUser.fromJson(userJson);
        } else {
            throw new Error(`Unknown AppUserType: ${userJson.type}`);
        }

        return new GetAppUserSuccessRes({
            user,
            authToken: AuthToken.fromJson(json.authToken),
        });
    }
}
