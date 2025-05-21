import React from "react";


export function Label({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label {...props} className="text-sm font-medium text-default">
            {children}
        </label>
    );
}


export function RequiredMarker() {
    return (
        <span className="text-red-500" aria-hidden="true">
            *
        </span>
    );
}

