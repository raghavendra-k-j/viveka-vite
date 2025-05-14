import { createContext, useContext } from "react";
import { STTLaTexDialogStore } from "./STTLaTexDialogStore";

export const STTLaTexDialogContext = createContext<STTLaTexDialogStore | null>(null);

export const useSTTLaTexDialogStore = () => {
    const context = useContext(STTLaTexDialogContext);
    if (!context) {
        throw new Error("useSTTLaTexDialogStore must be used within a STTLaTexDialogProvider");
    }
    return context;
}