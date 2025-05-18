import FilledButton from "../button/FilledButton";
import OutlinedButton from "../button/OutlinedButton";

export type ToastViewProps = {
    message?: string;
    description?: string;
    primaryButton?: {
        text: string;
        onClick: () => void;
    };
    secondaryButton?: {
        text: string;
        onClick: () => void;
    };
};

export function ToastView({
    message,
    description,
    primaryButton,
    secondaryButton,
}: ToastViewProps) {
    return (
        <div className="flex flex-col">
            {message && <div className="text-base-m text-default font-semibold">{message}</div>}
            {description && <div className="text-sm text-secondary">{description}</div>}
            {(primaryButton || secondaryButton) && (
                <div className="mt-2 flex gap-3">
                    {secondaryButton && (
                        <OutlinedButton size="sm" onClick={secondaryButton.onClick} type="button">
                            {secondaryButton.text}
                        </OutlinedButton>
                    )}
                    {primaryButton && (
                        <FilledButton
                            size="sm"
                            onClick={primaryButton.onClick}
                            type="button"
                        >
                            {primaryButton.text}
                        </FilledButton>
                    )}
                </div>
            )}
        </div>
    );
}


