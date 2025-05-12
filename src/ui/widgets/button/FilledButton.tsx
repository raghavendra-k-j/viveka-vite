import clsx from "clsx";
import React from "react";

type FilledButtonVariant = "primary";

type FilledButtonProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    variant?: FilledButtonVariant;
    className?: string;
} & React.ComponentPropsWithoutRef<T>;

export default function FilledButton<T extends React.ElementType = "button">({
    as,
    children,
    variant = "primary",
    className,
    ...rest
}: FilledButtonProps<T>) {
    const classNameComputed = clsx("btn", `btn--${variant}`, className);
    const Component = as || "button";
    return (
        <Component className={classNameComputed} {...rest}>
            {children}
        </Component>
    );
}
