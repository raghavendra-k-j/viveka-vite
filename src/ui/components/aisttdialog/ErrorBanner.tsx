import { CircleAlert } from "lucide-react";
import clsx from "clsx";

interface ErrorBannerProps {
    message: string;
    onRetry: () => void;
    onCancel: () => void;
}

export function ErrorBanner({ message, onRetry, onCancel }: ErrorBannerProps) {
    return (
        <div
            className={clsx(
                "w-full bg-red-50 border border-red-200 text-red-700 rounded px-3 py-2 text-sm my-2",
                "flex flex-col gap-2"
            )}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-center gap-2">
                <CircleAlert size={18} />
                <span>{message}</span>
            </div>
            <div className="flex gap-4 justify-start">
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-600 font-medium"
                    aria-label="Cancel"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    onClick={onRetry}
                    className="text-red-700 hover:text-red-800 font-semibold"
                    aria-label="Retry"
                    type="button"
                >
                    Retry
                </button>
            </div>
        </div>
    );
}
