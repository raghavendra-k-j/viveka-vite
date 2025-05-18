import { createContext, useContext } from "react";
import { FormAuthStore } from "./FormAuthStore";

export const FormAuthContext = createContext<FormAuthStore | undefined>(undefined);

export function useFormAuthStore(): FormAuthStore {
    const context = useContext(FormAuthContext);
    if (!context) {
        throw new Error("useFormAuthStore must be used within a FormAuthProvider");
    }
    return context;
}
