import React, { useEffect, useMemo } from "react";
import { FormAuthContext } from "./FormAuthContext";
import { FormAuthStore } from "./FormAuthStore";
import { useSubmitStore } from "../SubmitContext";

export const FormAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const parentStore = useSubmitStore();
    const store = useMemo(() => {
        const storeData = new FormAuthStore({ parentStore: parentStore });
        return storeData;
    }, [parentStore]);

    useEffect(() => {
        return () => {
            store.dispose();
        };
    }, [store]);

    return (
        <FormAuthContext.Provider value={store}>
            {children}
        </FormAuthContext.Provider>
    );
};
