import type { AppEnv } from "~/core/config/AppEnv";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { addAuthInterceptor } from "~/infra/datasources/apiClientHelper";
import { BaseApiClient } from "~/infra/datasources/BaseApiClient";
import type { DeviceInfo } from "~/infra/utils/deviceinfo/DeviceInfo";
import { DeviceInfoUtil } from "~/infra/utils/deviceinfo/DeviceInfoUtil";

export class AppStore {
    
    appEnv: AppEnv;
    orgConfig: OrgConfig;
    _deviceInfo: DeviceInfo | null = null;

    constructor({ appEnv, orgConfig }: { appEnv: AppEnv, orgConfig: OrgConfig }) {
        this.appEnv = appEnv;
        this.orgConfig = orgConfig;
        BaseApiClient.createInstace({ baseURL: this.appEnv.apiBase });
        ApiClient.createInstace({ baseURL: this.appEnv.apiBase });
        addAuthInterceptor();
    }

    get deviceInfo(): DeviceInfo {
        if (this._deviceInfo) {
            return this._deviceInfo;
        }
        const deviceInfo = DeviceInfoUtil.getDeviceInfo();
        this._deviceInfo = deviceInfo;
        return deviceInfo;
    }

}