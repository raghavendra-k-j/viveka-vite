import { useEffect } from "react";
import { useAppStore } from "../_layout/AppContext";
import { useLocation, useNavigate } from "react-router";
import { PageLoader } from "~/ui/components/loaders/PageLoader";
import { AuthConst } from "~/core/const/AuthConst";

export default function AutoLoginPage() {
    const appStore = useAppStore();
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userId = params.get(AuthConst.keyUserId);
        const tempAuthToken = params.get(AuthConst.keyTempAuthToken);
        const redirect = params.get(AuthConst.keyRedirect);
        if (tempAuthToken && userId && redirect) {
            (async () => {
                try {
                    const resEither = await appStore.authService.autoLogin({
                        tempAuthToken: tempAuthToken,
                        userId: parseInt(userId),
                    });
                    const autoLoginRes = resEither.getOrError();

                    await appStore.authService.saveTokenLocally({
                        accessToken: autoLoginRes.authToken.accessToken,
                        appUserType: autoLoginRes.user.appUserType,
                    });

                    navigate(redirect, { replace: true });
                }
                catch (err) {
                    console.error("Auto-login failed:", err);
                }
            })();
        }
    }, [location.search, appStore, navigate]);

    return (<PageLoader />);
}