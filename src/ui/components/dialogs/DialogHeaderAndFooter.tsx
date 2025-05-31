import clsx from "clsx";
import { X } from "lucide-react";
import React, { ReactNode } from "react";

export type DialogHeaderProps = {
    className?: string;
    leading?: React.ReactNode | string;
    title?: string | React.ReactNode;
    px?: string | number;
    py?: string | number;
    display?: string;
    border?: string;
    align?: string;
    justify?: string;
    onClose?: ReactNode;
    shadow?: string;
};

export function DialogHeader(props: DialogHeaderProps) {
    const {
        className,
        leading,
        title,
        px = "px-4",
        py = "py-2",
        display = "flex",
        border = "border-b border-default",
        align = "items-center",
        justify = "justify-between",
        shadow = "shadow-sm",
        onClose
    } = props;


    // Compose display, border, align, justify
    const displayClass = display;
    const borderClass = border;
    const alignClass = align;
    const justifyClass = justify;
    const shadowClass = shadow;

    return (
        <div
            className={clsx(
                px,
                py,
                borderClass,
                shadowClass,
                displayClass,
                alignClass,
                justifyClass,
                className
            )}
        >
            <div className="flex items-center gap-2 min-w-0 flex-1">
                {leading}
                {typeof title === "string" ? <DefaultDialogTitle title={title} /> : title}
            </div>
            {onClose && onClose}
        </div>
    );
}

export function DefaultDialogTitle({ title }: { title: string }) {
    return (
        <h2 className="text-default font-bold text-base-p truncate" title={title}>
            {title}
        </h2>
    );
}

export function DialogCloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            aria-label="Close dialog"
            className="text-default"
            onClick={onClick}
            tabIndex={0}
        >
            <X className="w-6 h-6" />
        </button>
    );
}


type DialogFooterProps = {
    className?: string;
    actions?: ReactNode;
    actionsGap?: string,
    px?: string | number;
    py?: string | number;
    display?: string;
    align?: string;
    justify?: string;
}


export function DialogFooter(props: DialogFooterProps) {
    const {
        className,
        actions,
        actionsGap = "gap-2",
        px = "px-4",
        py = "py-2",
        display = "flex",
        align = "items-center",
        justify = "justify-end"
    } = props;

    return (
        <div
            className={clsx(
                px,
                py,
                actionsGap,
                display,
                align,
                justify,
                className
            )}
        >
            {actions}
        </div>
    );
}