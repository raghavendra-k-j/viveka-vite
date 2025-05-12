import { createContext, useContext } from "react";
import type { AppStore } from "./AppStore";

export const AppContext = createContext<AppStore | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}