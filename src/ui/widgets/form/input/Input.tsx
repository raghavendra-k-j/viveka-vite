import clsx from "clsx";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
    "input",
    {
        variants: {
            size: {
                sm: "input--sm",
                md: "input--md",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);


export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> { }


const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, size, type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                className={clsx(inputVariants({ size }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
