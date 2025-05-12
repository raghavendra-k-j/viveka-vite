import React from "react";
import { observer } from "mobx-react-lite";
import { DialogManagerStore } from "./DialogManagerStore";
import { createPortal } from "react-dom";

const DialogRenderer: React.FC<{ store: DialogManagerStore }> = observer(({ store }) => {
    return (
        <>
            {store.dialogs.map((dialog) => {
                const DialogComponent = dialog.component;
                return createPortal(
                    <DialogComponent key={dialog.id} {...dialog.props} />,
                    document.getElementById("dialog-manager-root") as HTMLElement
                );
            })}
        </>
    );
});

export default DialogRenderer;
