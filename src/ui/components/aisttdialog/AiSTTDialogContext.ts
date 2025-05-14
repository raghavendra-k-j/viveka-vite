import { createContext, useContext } from "react";
import { AiSTTDialogStore } from "./AiSTTDialogStore";

export const AiSTTDialogContext = createContext<AiSTTDialogStore | null>(null);

export const useAiSTTDialogStore = () => {
    const context = useContext(AiSTTDialogContext);
    if (!context) {
        throw new Error("useAiSTTDialogStore must be used within an AiSTTDialogProvider");
    }
    return context;
}