import Cookies from "js-cookie";
import { ApiClient } from "./ApiClient";
import { AuthConst } from "~/core/const/AuthConst";

export function addAuthInterceptor() {
    const client = ApiClient.findInstance();
    client.axios.interceptors.request.use((request) => {
        const accessToken = Cookies.get(AuthConst.keyAccessToken);
        const appUserType = Cookies.get(AuthConst.keyAppUserType);
        if (accessToken && appUserType) {
            request.headers[AuthConst.keyAuthorization] = accessToken;
            request.headers[AuthConst.keyAppUserType] = appUserType;
        }
        return request;
    });
}
