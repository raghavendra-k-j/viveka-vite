import { createContext, useContext } from "react";
import { STTDialogStore } from "./STTDialogStore";

export const STTDialogContext = createContext<STTDialogStore | null>(null);

export const useSTTDialogStore = () => {
    const context = useContext(STTDialogContext);
    if (!context) {
        throw new Error("useSTTDialogStore must be used within a STTDialogProvider");
    }
    return context;
}