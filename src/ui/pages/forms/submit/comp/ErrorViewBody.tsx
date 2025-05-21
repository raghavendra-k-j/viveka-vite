import { ApiError } from "~/infra/errors/ApiError";
import { useSubmitStore } from "../SubmitContext";
import FilledButton from "~/ui/widgets/button/FilledButton";

export function ErrorViewBody() {
    const store = useSubmitStore();
    const appError = store.formDetailState.error;

    const handleRetry = () => store.loadFormDetail();

    const renderButtons = () => {
        if (appError instanceof ApiError) {
            if (appError.isUnauthorized) {
                return (
                    <FilledButton onClick={() => { store.appStore.navigateToLogin() }}>
                        Log In to Continue
                    </FilledButton>
                );
            }
            else if (appError.isForbidden) {
                return (
                    <FilledButton onClick={() => { store.appStore.logoutAndGoToLogin() }}>
                        Log In with Another Account
                    </FilledButton>
                );
            }
            else {
                return (
                    <FilledButton onClick={handleRetry}>
                        Retry
                    </FilledButton>
                );
            }
        }
        return (
            <FilledButton onClick={handleRetry}>
                Retry
            </FilledButton>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <div className="text-default text-base font-semibold">{appError.message}</div>
            <div className="text-secondary text-sm mt-1">{appError.description}</div>
            <div className="mt-4 flex flex-col gap-2">
                {renderButtons()}
            </div>
        </div>
    );
}
