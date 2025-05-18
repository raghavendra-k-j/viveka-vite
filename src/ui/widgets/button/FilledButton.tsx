import clsx from "clsx";
import { Loader2 } from "lucide-react";
import React from "react";
import { ButtonSize } from "./ButtonSize";

type FilledButtonVariant = "primary";

type FilledButtonProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    variant?: FilledButtonVariant;
    size?: ButtonSize;
    className?: string;
    isLoading?: boolean;
    loaderChild?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export default function FilledButton<T extends React.ElementType = "button">({
    as,
    children,
    variant = "primary",
    size = "md",
    className,
    isLoading = false,
    loaderChild,
    ...rest
}: FilledButtonProps<T>) {
    const classNameComputed = clsx(
        "btn",
        `btn--${size}`,
        "btn-filled",
        `btn--${variant}`,
        { "is-disabled": isLoading },
        className
    );

    const Component = as || "button";

    return (
        <Component className={classNameComputed} disabled={isLoading} {...rest}>
            {isLoading && <span className="loader-icon"><Loader2 className="animate-spin" /></span>}
            {isLoading && loaderChild ? loaderChild : children}
        </Component>
    );
}
