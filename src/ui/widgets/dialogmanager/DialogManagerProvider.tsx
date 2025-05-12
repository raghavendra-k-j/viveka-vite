import React from "react";
import { DialogManagerContext } from "./DialogManagerContext";
import { DialogManagerStore } from "./DialogManagerStore";
import DialogRenderer from "./DialogRenderer";

interface DialogManagerProviderProps {
    children: React.ReactNode;
}

export const DialogManagerProvider: React.FC<DialogManagerProviderProps> = ({ children }) => {
    const store = React.useMemo(() => new DialogManagerStore(), []);
    return (
        <DialogManagerContext.Provider value={store}>
            {children}
            <DialogRenderer store={store} />
        </DialogManagerContext.Provider>
    );
};
