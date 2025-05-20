import { createContext, useContext } from "react";
import { ResponseViewStore } from "./ResponseViewStore";

export const ResponseViewContext = createContext<ResponseViewStore | null>(null);

export const useResponseViewStore = () => {
    const context = useContext(ResponseViewContext);
    if (!context) {
        throw new Error("useResponseViewStore must be used within a ResponseViewProvider");
    }
    return context;
}