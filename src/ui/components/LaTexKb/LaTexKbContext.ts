import { createContext, useContext } from "react";
import { LaTexKbStore } from "./LaTextKbStore";

export const LaTexKbContext = createContext<LaTexKbStore | null>(null);

export const useLaTexKbStore = () => {
    const context = useContext(LaTexKbContext);
    if (!context) {
        throw new Error("useLaTexKbStore must be used within a LaTexKbProvider");
    }
    return context;
}