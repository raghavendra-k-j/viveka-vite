import { DialogManagerStore } from "~/ui/widgets/dialogmanager";
import { BasicErrorDialog, BasicErrorDialogButton } from "./BasicErrorDialog";
import { ReactNode } from "react";

export interface ShowErrorDialogOptions {
    dialogManager: DialogManagerStore;
    dialogId?: string;
    message?: string | ReactNode;
    description?: string | ReactNode;
    primaryButton?: BasicErrorDialogButton;
    secondaryButton?: BasicErrorDialogButton;
}

export function showErrorDialog({
    dialogManager,
    dialogId = "generic-error-dialog",
    message,
    description,
    primaryButton,
    secondaryButton,
}: ShowErrorDialogOptions): void {
    dialogManager.show({
        id: dialogId,
        component: BasicErrorDialog,
        props: {
            message,
            description,
            primaryButton,
            secondaryButton,
        },
    });
}
