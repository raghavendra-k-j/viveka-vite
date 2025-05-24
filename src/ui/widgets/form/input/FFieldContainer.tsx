import React, { ReactNode } from "react";

type FFieldContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode;
};

export function FFieldContainer({
    children,
    ...divProps
}: FFieldContainerProps) {
    return (
        <div className="flex flex-col gap-1" {...divProps}>
            {children}
        </div>
    );
}
