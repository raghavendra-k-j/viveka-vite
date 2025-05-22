import { DialogManagerStore } from "~/ui/widgets/dialogmanager";
import { BasicErrorDialog, BasicErrorDialogButton } from "./BasicErrorDialog";
import { AppError } from "~/core/error/AppError";

export interface ShowAppErrorDialogParams {
    dialogManager: DialogManagerStore;
    appError: AppError;
    primaryButton?: BasicErrorDialogButton;
    secondaryButton?: BasicErrorDialogButton;
    dialogId?: string;
}

export function showAppErrorDialog({
    dialogManager,
    appError,
    primaryButton,
    secondaryButton,
    dialogId = "app-error-dialog",
}: ShowAppErrorDialogParams): void {
    dialogManager.show({
        id: dialogId,
        component: BasicErrorDialog,
        props: {
            message: appError.message,
            description: appError.description,
            primaryButton,
            secondaryButton,
        },
    });
}