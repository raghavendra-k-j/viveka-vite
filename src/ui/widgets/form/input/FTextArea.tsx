import clsx from "clsx";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const fTextareaVariants = cva("finput", {
    variants: {
        inputSize: {
            sm: "finput--sm",
            md: "finput--md",
        },
    },
    defaultVariants: {
        inputSize: "md",
    },
});

export interface FTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof fTextareaVariants> { }

const FTextarea = React.forwardRef<HTMLTextAreaElement, FTextareaProps>(
    ({ className, inputSize, ...props }, ref) => {
        return (
            <textarea
                className={clsx(fTextareaVariants({ inputSize }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

FTextarea.displayName = "FTextarea";

export { FTextarea };