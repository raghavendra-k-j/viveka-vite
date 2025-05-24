import clsx from "clsx";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const fSelectVariants = cva(
    "fselect",
    {
        variants: {
            inputSize: {
                sm: "fselect--sm",
                md: "fselect--md",
            },
        },
        defaultVariants: {
            inputSize: "md",
        },
    }
);

export interface FSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof fSelectVariants> { }

const FSelect = React.forwardRef<HTMLSelectElement, FSelectProps>(
    ({ className, inputSize, children, ...props }, ref) => {
        return (
            <select
                className={clsx(fSelectVariants({ inputSize }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        );
    }
);

FSelect.displayName = "FSelect";

export { FSelect };
