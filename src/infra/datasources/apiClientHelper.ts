import { ApiClient } from "./ApiClient";
import { AuthConst } from "~/core/const/AuthConst";
import { AppStore } from "~/ui/pages/_layout/AppStore";

export function addAuthInterceptor({ appStore }: { appStore: AppStore }) {
    const client = ApiClient.findInstance();
    client.axios.interceptors.request.use((request) => {
        const appUser = appStore.optAppUser;
        const authToken = appStore.optAuthToken;
        if (appUser && authToken) {
            request.headers[AuthConst.keyAuthorization] = authToken.accessToken;
            request.headers[AuthConst.keyAppUserType] = appUser.appUserType.type;
        }
        return request;
    });
}
