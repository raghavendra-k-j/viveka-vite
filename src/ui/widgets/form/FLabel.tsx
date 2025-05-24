import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const fLabelVariants = cva("text-default", {
    variants: {
        inputSize: {
            sm: "text-xs",
            md: "text-sm",
        },
    },
    defaultVariants: {
        inputSize: "md",
    },
});

export type FLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof fLabelVariants>;

export function FLabel({
    inputSize,
    className,
    children,
    ...props
}: FLabelProps) {
    return (
        <label {...props} className={fLabelVariants({ inputSize: inputSize, className })}>
            {children}
        </label>
    );
}
