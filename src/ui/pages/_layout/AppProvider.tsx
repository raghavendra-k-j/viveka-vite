import { useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { AppStore } from "./AppStore";
import type { AppEnv } from "~/core/config/AppEnv";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";
import { DialogManagerProvider } from "~/ui/widgets/dialogmanager";
import { ToastContainer } from "react-toastify";
import { PageLoader } from "~/ui/components/loaders/PageLoader";

export function AppProvider({
    children,
    appEnv,
    orgConfig,
}: {
    children: React.ReactNode;
    appEnv: AppEnv;
    orgConfig: OrgConfig;
}) {
    const appStoreRef = useRef<AppStore | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    if (!appStoreRef.current) {
        appStoreRef.current = new AppStore({ appEnv, orgConfig });
    }

    useEffect(() => {
        (async () => {
            await appStoreRef.current?.trySoftLogin();
            setIsInitialized(true);
        })();
    }, []);


    if (!isInitialized) {
        return <PageLoader />;
    }

    return (
        <AppContext.Provider value={appStoreRef.current}>
            <DialogManagerProvider>
                {children}
            </DialogManagerProvider>
            <ToastContainer position="bottom-right" />
        </AppContext.Provider>
    );
}
