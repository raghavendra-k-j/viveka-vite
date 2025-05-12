import React from "react";

type BadgeVariant = "primary";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
    children: React.ReactNode;
};

export function Badge({ children, variant, className = "", ...rest }: BadgeProps) {
    const variantClass = variant ? `badge--${variant}` : "";
    const combinedClass = `badge ${variantClass} ${className}`.trim();

    return (
        <span className={combinedClass} {...rest}>
            {children}
        </span>
    );
}
