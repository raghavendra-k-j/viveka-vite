import Cookies from "js-cookie";
import { ApiClient } from "./ApiClient";
import { AuthConst } from "~/core/const/AuthConst";

export function addAuthInterceptor() {
    const client = ApiClient.findInstance();

    client.axios.interceptors.request.use((request) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            request.headers[AuthConst.keyAuthorization] = accessToken;
            request.headers["X-App-User-Type"] = "AUTH";
        }
        return request;
    });
}

function getAccessToken(): string | null {
    return Cookies.get(AuthConst.keyAccessToken) ?? null;
}
