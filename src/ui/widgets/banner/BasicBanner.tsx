import * as React from "react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const bannerVariants = cva(
    "w-full flex items-start gap-4 rounded-md px-4 py-3 border",
    {
        variants: {
            variant: {
                info: "bg-blue-50 border-blue-200 text-blue-800",
                warning: "bg-amber-50 border-amber-200 text-amber-800",
                danger: "bg-red-50 border-red-200 text-red-800",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
);

const iconWrapperVariants = cva("p-2 rounded-md flex items-center justify-center", {
    variants: {
        variant: {
            info: "bg-blue-100",
            warning: "bg-amber-100",
            danger: "bg-red-100",
        },
    },
    defaultVariants: {
        variant: "info",
    },
});

export interface BasicBannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
    icon?: React.ReactNode;
    message?: string | React.ReactNode;
    description?: string | React.ReactNode;
}

export const BasicBanner: React.FC<BasicBannerProps> = ({
    icon,
    message,
    description,
    variant,
    className,
    ...props
}) => {
    return (
        <div className={clsx(bannerVariants({ variant }), className)} {...props}>
            {icon && (
                <div className={iconWrapperVariants({ variant })}>
                    {icon}
                </div>
            )}
            <div className="flex flex-col gap-1">
                {message && <div className="text-sm font-semibold">{message}</div>}
                {description && <div className="text-sm text-muted-foreground">{description}</div>}
            </div>
        </div>
    );
};
