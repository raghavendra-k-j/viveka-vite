import React, { useEffect, useMemo } from "react";
import { FormAuthContext } from "./FormAuthContext";
import { FormAuthStore } from "./FormAuthStore";
import { useSubmitStore } from "../SubmitContext";
import { logger } from "~/core/utils/logger";

export const FormAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const parentStore = useSubmitStore();
    const store = useMemo(() => {
        logger.debug("useMemo");
        const storeData = new FormAuthStore({ parentStore: parentStore });
        logger.debug("useMemo: created", storeData.instanceId);
        return storeData;
    }, [parentStore]);

    useEffect(() => {
        logger.debug("useEffect", store.instanceId);

        return () => {
            store.dispose();
            logger.debug("useEffect: unmount", store.instanceId);
        };
    }, [store]);

    return (
        <FormAuthContext.Provider value={store}>
            {children}
        </FormAuthContext.Provider>
    );
};
