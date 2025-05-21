import { AppError } from "~/core/error/AppError";
import { SimpleErrorView } from "./SimpleErrorView";
import FilledButton from "../button/FilledButton";

export type SimpleRetryableAppErrorViewProps = {
    appError: AppError;
    onRetry: () => void;
    className?: string;
};

export function SimpleRetryableAppView({
    appError,
    onRetry,
    className = "",
}: SimpleRetryableAppErrorViewProps) {
    return (
        <SimpleErrorView
            message={appError.message}
            description={appError.description}
            actions={[
                <FilledButton onClick={onRetry} key="retry" >
                    Retry
                </FilledButton>
            ]}
            className={className}
        />
    );
}
