import { useEffect } from "react";
import { useAppStore } from "../_layout/AppContext";
import { AppUserType } from "~/domain/common/models/AppUserType";
import { useLocation, useNavigate } from "react-router";
import { PageLoader } from "~/ui/components/loaders/PageLoader";
import { AuthConst } from "~/core/const/AuthConst";

export default function TokenLoginPage() {
    const appStore = useAppStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get(AuthConst.keyAccessToken);
        const redirect = params.get(AuthConst.keyRedirect);
        if (accessToken) {
            appStore.authService.saveTokenLocally({
                accessToken,
                appUserType: AppUserType.auth,
            });
            if (redirect) {
                navigate(redirect, { replace: true });
            }
        }
    }, [location.search, appStore, navigate]);

    return (<PageLoader />);
}