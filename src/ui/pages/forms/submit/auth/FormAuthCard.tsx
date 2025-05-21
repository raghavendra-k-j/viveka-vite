import clsx from "clsx";

export function FormAuthCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className="min-h-full p-4 sm:p-6">
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
