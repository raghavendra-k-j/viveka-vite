import clsx from "clsx";

export function FormAuthCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className="p-4">
            <div
                className={clsx(
                    "flex flex-col bg-surface rounded-sm border-slate-200 shadow-lg mx-auto max-w-md",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
}
