import { useRef } from "react";
import { AppContext } from "./AppContext";
import { AppStore } from "./AppStore";
import type { AppEnv } from "~/core/config/AppEnv";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";
import { DialogManagerProvider } from "~/ui/widgets/dialogmanager";

export function AppProvider({ children, appEnv, orgConfig }: { children: React.ReactNode, appEnv: AppEnv, orgConfig: OrgConfig }) {
    const appStoreRef = useRef<AppStore | null>(null);
    if (!appStoreRef.current) {
        appStoreRef.current = new AppStore({ appEnv, orgConfig });
    }

    return (
        <AppContext.Provider value={appStoreRef.current}>
            <DialogManagerProvider>
                {children}
            </DialogManagerProvider>
        </AppContext.Provider>
    );
}