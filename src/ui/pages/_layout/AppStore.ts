import { makeObservable, observable, runInAction } from "mobx";
import type { AppEnv } from "~/core/config/AppEnv";
import { AppError } from "~/core/error/AppError";
import { logger } from "~/core/utils/logger";
import { AuthService } from "~/domain/auth/services/AuthService";
import { AbsUser } from "~/domain/common/models/AbsUser";
import { AuthToken } from "~/domain/common/models/AuthToken";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { addAuthInterceptor } from "~/infra/datasources/apiClientHelper";
import { BaseApiClient } from "~/infra/datasources/BaseApiClient";
import { AuthRepo } from "~/infra/repos/AuthRepo";
import type { DeviceInfo } from "~/infra/utils/deviceinfo/DeviceInfo";
import { DeviceInfoUtil } from "~/infra/utils/deviceinfo/DeviceInfoUtil";
import { DataState } from "~/ui/utils/DataState";

export class AppStore {

    appEnv: AppEnv;
    orgConfig: OrgConfig;
    _deviceInfo: DeviceInfo | null = null;
    authService: AuthService;
    authState: DataState<undefined> = DataState.init();
    public _appUser: AbsUser | null = null;
    public _authToken: AuthToken | null = null;

    get appUser(): AbsUser {
        return this._appUser!;
    }

    get hasUser(): boolean {
        return this._appUser !== null;
    }

    get optAppUser(): AbsUser | null {
        return this._appUser;
    }

    get authToken(): AuthToken {
        return this._authToken!;
    }

    get optAuthToken(): AuthToken | null {
        return this._authToken;
    }



    constructor({ appEnv, orgConfig }: { appEnv: AppEnv, orgConfig: OrgConfig }) {
        this.appEnv = appEnv;
        this.orgConfig = orgConfig;
        BaseApiClient.createInstace({ baseURL: this.appEnv.apiBase });
        ApiClient.createInstace({ baseURL: this.appEnv.apiBase });
        addAuthInterceptor({ appStore: this });
        makeObservable(this, {
            _appUser: observable.ref
        });
        this.authService = new AuthService(new AuthRepo(ApiClient.findInstance()));
    }

    get deviceInfo(): DeviceInfo {
        if (this._deviceInfo) {
            return this._deviceInfo;
        }
        const deviceInfo = DeviceInfoUtil.getDeviceInfo();
        this._deviceInfo = deviceInfo;
        return deviceInfo;
    }

    async trySoftLogin() {
        try {
            runInAction(() => {
                this.authState = DataState.loading();
            });
            const accessToken = await this.authService.getAccessToken();
            if (!accessToken) {
                throw new Error("accessToken is null");
            }
            const res = (await this.authService.softLogin(accessToken)).getOrError();
            await this.updateAuthResponse({
                user: res.user,
                authToken: AuthToken.fromAccessToken(accessToken),
            });
        }
        catch (err) {
            logger.error("softLogin error", err);
            const appError = AppError.fromAny(err);
            this.authState = DataState.error(appError);
        }
    }

    async updateAuthResponse({ user, authToken }: { user: AbsUser, authToken: AuthToken }) {
        await this.authService.clearTokenLocally();
        await this.authService.saveTokenLocally({
            accessToken: authToken.accessToken,
            appUserType: user.appUserType,
        });
        runInAction(() => {
            this._appUser = user;
            this._authToken = authToken;
        });
    }

    navigateToLogin() {
        const loginUrl = this.appEnv.webBase + "/login";
        window.location.href = loginUrl;
    }


    async logoutAndGoToLogin() {
        await this.authService.removeTokenLocally();
        runInAction(() => {
            this._appUser = null;
            this.authState = DataState.init();
        });
        this.navigateToLogin();
    }



}