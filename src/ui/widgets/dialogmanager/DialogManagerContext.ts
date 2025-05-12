import { createContext, useContext } from "react";
import { DialogManagerStore } from "./DialogManagerStore";

export const DialogManagerContext = createContext<DialogManagerStore | null>(null);

export function useDialogManager(): DialogManagerStore {
    const context = useContext(DialogManagerContext);
    if (!context) {
        throw new Error("useDialogManager must be used within a DialogManagerProvider.");
    }
    return context;
}
