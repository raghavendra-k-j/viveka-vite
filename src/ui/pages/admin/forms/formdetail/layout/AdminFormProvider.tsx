import React, { ReactNode, useEffect } from "react";
import { AdminFormStore } from "./AdminFormStore";
import { AdminFormContext } from "./AdminFormContext";

type AdminFormProviderProps = {
    store: AdminFormStore;
    children: ReactNode;
};

export const AdminFormProvider: React.FC<AdminFormProviderProps> = ({ store, children }) => {
    useEffect(() => {
        store.loadFormDetails();
    }, [store]);
    return (
        <AdminFormContext.Provider value={store}>
            {children}
        </AdminFormContext.Provider>
    );
};