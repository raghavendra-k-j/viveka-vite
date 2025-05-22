import { DialogManagerStore } from "~/ui/widgets/dialogmanager";
import { ReactNode } from "react";
import { BasicLoadingDialog } from "./BasicLoadingDialog";

export interface ShowLoadingDialogOptions {
    dialogManager: DialogManagerStore;
    dialogId?: string;
    message: string | ReactNode;
}

export function showLoadingDialog({
    dialogManager,
    dialogId = "app-loading-dialog",
    message,
}: ShowLoadingDialogOptions): void {
    dialogManager.show({
        id: dialogId,
        component: BasicLoadingDialog,
        props: {
            message,
        },
    });
}
