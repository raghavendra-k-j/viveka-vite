import { createContext, useContext } from "react";
import { SubmitStore } from "./SubmitStore";

export const SubmitContext = createContext<SubmitStore | null>(null);

export const useSubmitStore = () => {
    const context = useContext(SubmitContext);
    if (!context) {
        throw new Error("useSubmitStore must be used within a SubmitProvider");
    }
    return context;
}