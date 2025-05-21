import clsx from "clsx";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const selectVariants = cva(
    "select",
    {
        variants: {
            size: {
                sm: "select--sm",
                md: "select--md",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">, VariantProps<typeof selectVariants> { }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <select
                className={clsx(selectVariants({ size }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        );
    }
);

Select.displayName = "Select";

export { Select };
