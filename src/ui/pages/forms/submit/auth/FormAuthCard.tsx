import clsx from "clsx";

export function FormAuthCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className="min-h-full">
            <div
                className={clsx(
                    "flex flex-col bg-surface rounded-sm border border-default shadow-lg mx-auto max-w-md",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
}
