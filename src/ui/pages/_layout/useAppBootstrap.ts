import { useEffect, useRef, useState } from "react";
import { AppEnv } from "~/core/config/AppEnv";
import { BaseApiClient } from "~/infra/datasources/BaseApiClient";
import { OrgConfig } from "~/domain/common/models/OrgConfig";
import { ConfigService } from "~/domain/common/services/ConfigService";
import { DataState } from "~/ui/utils/DataState";
import { ApiError } from "~/infra/errors/ApiError";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { addAuthInterceptor } from "~/infra/datasources/apiClientHelper";

export function useAppBootstrap() {
    const appEnvRef = useRef<AppEnv | null>(null);
    const orgConfigRef = useRef<OrgConfig | null>(null);
    const [loadState, setLoadState] = useState(DataState.init<undefined>());

    useEffect(() => {
        const load = async () => {
            try {
                setLoadState(DataState.loading());

                const appEnv = await AppEnv.loadFromFile();
                appEnvRef.current = appEnv;

                BaseApiClient.createInstace({ baseURL: appEnv.apiBase });
                ApiClient.createInstace({ baseURL: appEnv.apiBase });
                addAuthInterceptor();

                const configService = new ConfigService();
                const orgConfigData = (await configService.getOrgConfig(appEnv.tenant)).data;
                orgConfigRef.current = orgConfigData;

                setLoadState(DataState.data(undefined));
            } catch (error) {
                setLoadState(DataState.error(ApiError.fromAny(error)));
            }
        };

        void load();
    }, []);

    return {
        appEnv: appEnvRef.current,
        orgConfig: orgConfigRef.current,
        loadState,
    };
}
