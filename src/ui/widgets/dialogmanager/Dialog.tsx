import clsx from "clsx";
import { useEffect, useCallback, type ReactNode } from "react";

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
        <div className="dialog">
            {props.children}
        </div>
    );
}

export type DialogOverlayProps = {
    onClick?: () => void;
    className?: string;
};

export function DialogOverlay(props: DialogOverlayProps) {
    return (
        <div
            className={clsx(
                "dialog-overlay",
                props.className
            )}
            onClick={props.onClick}
        />
    );
}

export type DialogScaffoldProps = {
    children: ReactNode;
    className?: string;
};

export function DialogScaffold({ children, className, ...rest }: DialogScaffoldProps & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={clsx("dialog-scaffold", className)} {...rest}>
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
            className={clsx(
                "dialog-content",
                props.className
            )}
        >
            {props.children}
        </div>
    );
}



