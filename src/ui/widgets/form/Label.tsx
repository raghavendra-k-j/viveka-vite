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

type ErrorMessageProps = React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
};

export function ErrorMessage({ as: Component = "span", children, ...props }: ErrorMessageProps) {
    return (
        <Component {...props} className={`text-sm-m text-red-500 ${props.className || ""}`}>
            {children}
        </Component>
    );
}