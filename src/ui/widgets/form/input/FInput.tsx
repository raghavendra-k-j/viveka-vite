import clsx from "clsx";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const fInputVariants = cva("finput", {
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

export interface FInputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof fInputVariants> { }


const FInput = React.forwardRef<HTMLInputElement, FInputProps>(
    ({ className, inputSize, type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                className={clsx(fInputVariants({ inputSize }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

FInput.displayName = "FInput";

export { FInput };
