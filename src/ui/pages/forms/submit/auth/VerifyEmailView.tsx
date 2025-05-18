import FilledButton from "~/ui/widgets/button/FilledButton";
import { useFormAuthStore } from "./FormAuthContext";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { FormAuthCard } from "./FormAuthCard";
import { TextFormField } from "~/ui/widgets/form/input/TextFormField";
import { HeaderView } from "./HeaderView";
import { AppEntityConst } from "~/core/const/AppEntityConst";
import { Observer } from "mobx-react-lite";
import { useDialogManager } from "~/ui/widgets/dialogmanager";

export function VerifyEmailView() {
    const store = useFormAuthStore();
    const dialogManager = useDialogManager();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        store.onClickVerifyOTP(dialogManager);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormAuthCard>
                <HeaderView
                    title="Check your email"
                    subTitle={
                        <>
                            An OTP has been sent to{" "}
                            <span className="font-medium">{store.email.value}</span>. Please enter it below to verify.
                        </>
                    }
                />

                <div className="flex flex-col gap-6 px-6">
                    <TextFormField
                        id="otp"
                        label="Verification Code"
                        required
                        type="text"
                        placeholder={`Enter the ${AppEntityConst.emailOTPLength}-digit code`}
                        field={store.otp}
                    />

                    <div className="text-sm text-default">
                        Didn’t get the code?&nbsp;&nbsp;
                        <Observer>
                            {() =>
                                store.resendCountdown > 0 ? (
                                    <span className="text-primary font-semibold cursor-not-allowed">
                                        Resend ({store.resendCountdown}s)
                                    </span>
                                ) : (
                                    <span
                                        className="text-primary cursor-pointer font-semibold"
                                        onClick={() => store.onClickResendOTP(dialogManager)}
                                    >
                                        Resend it
                                    </span>
                                )
                            }
                        </Observer>
                    </div>
                </div>

                <div className="px-6 py-4 mt-4 gap-4 flex justify-end">
                    <OutlinedButton type="button" onClick={() => store.onClickBackInVerifyEmail()}>
                        Back
                    </OutlinedButton>

                    <Observer>
                        {() => (
                            <FilledButton
                                disabled={store.verifyState.isLoading}
                                type="submit"
                            >
                                Verify Email
                            </FilledButton>
                        )}
                    </Observer>
                </div>
            </FormAuthCard>
        </form>
    );
}
