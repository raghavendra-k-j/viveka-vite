import { useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import { AppStore } from "./AppStore";
import type { AppEnv } from "~/core/config/AppEnv";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";
import { DialogManagerProvider } from "~/ui/widgets/dialogmanager";
import { ToastContainer } from "react-toastify";

export function AppProvider({ children, appEnv, orgConfig }: { children: React.ReactNode, appEnv: AppEnv, orgConfig: OrgConfig }) {
    const appStoreRef = useRef<AppStore | null>(null);
    if (!appStoreRef.current) {
        appStoreRef.current = new AppStore({ appEnv, orgConfig });
    }

    useEffect(() => {
        (async () => {
            await appStoreRef.current?.trySoftLogin();
        })();
    }, []);

    return (
        <AppContext.Provider value={appStoreRef.current}>
            <DialogManagerProvider>
                {children}
            </DialogManagerProvider>
            <ToastContainer position="bottom-right" />
        </AppContext.Provider>
    );
}