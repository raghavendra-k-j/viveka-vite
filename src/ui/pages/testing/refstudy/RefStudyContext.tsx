import { createContext, useContext } from "react";
import { RefStudyStore } from "./RefStudyStore";

export const RefStudyContext = createContext<RefStudyStore | null>(null);

export const useRefStudyStore = () => {
    const context = useContext(RefStudyContext);
    if (!context) {
        throw new Error("useRefStudyStore must be used within a RefStudyProvider");
    }
    return context;
}