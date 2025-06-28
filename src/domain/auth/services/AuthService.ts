import { ApiError } from "~/infra/errors/ApiError";
import { AuthRes } from "../models/AuthRes";
import { ResEither } from "~/core/utils/ResEither";
import { AuthRepo } from "~/infra/repos/AuthRepo";
import Cookies from 'js-cookie'
import { AuthConst } from "~/core/const/AuthConst";
import { EmailOtpStatus } from "~/domain/common/models/EmailOtpStatus";
import { AppUserType } from "~/domain/common/models/AppUserType";
import { AutoLoginRes } from "../models/AutoLoginRes";

export class AuthService {




    private readonly authRepo: AuthRepo;

    constructor(authRepo: AuthRepo) {
        this.authRepo = authRepo;
    }

    async softLogin(accessToken: string): Promise<ResEither<ApiError, AuthRes>> {
        return this.authRepo.softLogin(accessToken);
    }

    async getAccessToken(): Promise<string | undefined> {
        const accessToken = Cookies.get("accessToken");
        return accessToken;
    }

    async removeTokenLocally() {
        Cookies.remove(AuthConst.keyAccessToken);
        Cookies.remove(AuthConst.keyAppUserType);
    }

    async saveTokenLocally({ accessToken, appUserType }: { accessToken: string, appUserType: AppUserType }) {
        Cookies.set(AuthConst.keyAccessToken, accessToken, { expires: 7 });
        Cookies.set(AuthConst.keyAppUserType, appUserType.type, { expires: 7 });
    }

    async checkAuthEmailOTPStatus(otpId: number): Promise<ResEither<ApiError, EmailOtpStatus | undefined>> {
        return this.authRepo.checkAuthEmailOTPStatus(otpId);
    }

    async autoLogin({ tempAuthToken, userId }: { tempAuthToken: string, userId: number }): Promise<ResEither<ApiError, AutoLoginRes>> {
        return this.authRepo.autoLogin({ tempAuthToken, userId });
    }


    async clearTokenLocally() {
        Cookies.remove(AuthConst.keyAccessToken);
        Cookies.remove(AuthConst.keyAppUserType);
    }


}