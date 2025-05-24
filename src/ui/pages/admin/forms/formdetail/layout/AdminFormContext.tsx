import { createContext, useContext } from "react";
import { AdminFormStore } from "./AdminFormStore";

export const AdminFormContext = createContext<AdminFormStore | null>(null);


export const useAdminFormStore = () => {
    const context = useContext(AdminFormContext);
    if (!context) {
        throw new Error("useAdminFormStore must be used within an AdminFormProvider");
    }
    return context;
}