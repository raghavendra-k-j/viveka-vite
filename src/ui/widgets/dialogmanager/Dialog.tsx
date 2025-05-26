import clsx from "clsx";
import { useEffect, useCallback, type ReactNode } from "react";
import { DialogContext, useDialog } from "./DialogContext";

export type DialogProps = {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
};

export function Dialog(props: DialogProps) {
    const { onClose } = props;

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && onClose) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    if (props.isOpen === false) return null;

    return (
        <DialogContext.Provider value={{ onClose }}>
            <div className="dialog">
                {props.children}
            </div>
        </DialogContext.Provider>
    );
}

export type DialogOverlayProps = {
    className?: string;
};

export function DialogOverlay(props: DialogOverlayProps) {
    const dialog = useDialog();
    return (
        <div
            className={clsx(
                "dialog-overlay",
                props.className
            )}
            onClick={dialog.onClose}
        />
    );
}

export type DialogScaffoldProps = {
    children: ReactNode;
    className?: string;
};

export function DialogScaffold({ children, className, ...rest }: DialogScaffoldProps & React.HTMLAttributes<HTMLDivElement>) {
    const dialog = useDialog();
    return (
        <div onClick={dialog.onClose} className={clsx("dialog-scaffold", className)} {...rest}>
            {children}
        </div>
    );
}


export type DialogBottomSheetScaffoldProps = {
    children: ReactNode;
    className?: string;
};

export function DialogBottomSheetScaffold({ children, className, ...rest }: DialogBottomSheetScaffoldProps & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={clsx("bottom-sheet-scaffold", className)} {...rest}>
            {children}
        </div>
    );
}


export type DialogContentProps = {
    children: ReactNode;
    className?: string;
};

export function DialogContent(props: DialogContentProps) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(
                "dialog-content",
                props.className
            )}
        >
            {props.children}
        </div>
    );
}





export type FramedDialogProps = {
    onClose: () => void;
    scaffoldClassName?: string;
    contentClassName?: string;
    children: ReactNode;
}

export function FramedDialog(props: FramedDialogProps) {
    return (
        <Dialog onClose={props.onClose}>
            <DialogOverlay />
            <DialogScaffold className={props.scaffoldClassName}>
                <DialogContent className={props.contentClassName}>
                    {props.children}
                </DialogContent>
            </DialogScaffold>
        </Dialog>
    );
}