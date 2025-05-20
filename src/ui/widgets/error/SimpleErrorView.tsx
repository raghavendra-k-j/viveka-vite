import { ReactNode } from "react";

export type SimpleErrorViewProps = {
    message: ReactNode | string | null | undefined;
    description?: ReactNode | string | null | undefined;
    actions?: ReactNode[] | ReactNode | null | undefined;
    className?: string;
};

export function SimpleErrorView({
    message,
    description,
    actions,
    className = "",
}: SimpleErrorViewProps) {
    if (!message && !description && !actions) return null;

    return (
        <div className={`${className}`}>
            {message && <div className="font-semibold text-default text-center mb-1">{message}</div>}
            {description && <div className="mb-3 text-sm text-center text-secondary">{description}</div>}
            {actions && (
                <div className="flex gap-2 flex-wrap justify-center">
                    {Array.isArray(actions)
                        ? actions.map((action, idx) => <span key={idx}>{action}</span>)
                        : actions}
                </div>
            )}
        </div>
    );
}
