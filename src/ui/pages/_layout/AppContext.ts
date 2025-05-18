import { createContext, useContext } from "react";
import type { AppStore } from "./AppStore";

export const AppContext = createContext<AppStore | null>(null);

export const useAppStore = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppStore must be used within an AppProvider");
    }
    return context;
}