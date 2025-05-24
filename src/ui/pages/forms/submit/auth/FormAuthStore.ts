import { action, makeObservable, observable, runInAction } from "mobx";
import { SubmitStore } from "../SubmitStore";
import { DataState } from "~/ui/utils/DataState";
import { FormCurrentAuthFragment } from "./FormCurrentAuthFragment";
import { GetAppUserRes, GetAppUserSuccessRes } from "~/domain/forms/models/submit/GetAppUserRes";
import { EmailOtpStatus } from "~/domain/common/models/EmailOtpStatus";
import { AppError } from "~/core/error/AppError";
import { logger } from "~/core/utils/logger";
import { GetAppUserReq } from "~/domain/forms/models/submit/GetAppUserReq";
import { InstanceId } from "~/core/utils/InstanceId";
import { FValue } from "~/ui/widgets/form/FValue";
import { AppEntityConst } from "~/core/const/AppEntityConst";
import validator from 'validator';
import { DialogManagerStore } from "~/ui/widgets/dialogmanager";
import { withMinDelay } from "~/infra/utils/withMinDelay";
import { EmailOTPConst } from "~/core/const/EmailOTPConst";
import { ApiError } from "~/infra/errors/ApiError";
import { showAppErrorDialog } from "~/ui/components/dialogs/showAppErrorDialog";
import { showLoadingDialog } from "~/ui/components/dialogs/showLoadingDialog";

export type FormAuthStoreProps = {
    parentStore: SubmitStore;
}

export class FormAuthStore {

    public readonly instanceId: string = InstanceId.generate("FormAuthStore");
    public readonly parentStore: SubmitStore;

    public name!: FValue<string>;
    public email!: FValue<string>;
    public mobile!: FValue<string>;
    public otp!: FValue<string>;

    public submitState: DataState<undefined> = DataState.init();
    public verifyState: DataState<undefined> = DataState.init();
    public currentFragment: FormCurrentAuthFragment = FormCurrentAuthFragment.CollectDetails;
    public otpId: number | null = null;
    public emailStatus: EmailOtpStatus | undefined = undefined;
    private otpStatusTimer: ReturnType<typeof setInterval> | null = null;
    resendCountdown: number = 0;

    get formService() {
        return this.parentStore.formService;
    }

    constructor(props: FormAuthStoreProps) {
        logger.debug("Creating", this.instanceId);
        this.parentStore = props.parentStore;

        this.name = new FValue<string>("", { validator: this.nameValidator });
        this.email = new FValue<string>("", { validator: this.emailValidator });
        this.mobile = new FValue<string>("", { validator: this.mobileValidator });
        this.otp = new FValue<string>("", { validator: this.otpValidator });

        makeObservable(this, {
            name: observable,
            email: observable,
            mobile: observable,
            otp: observable,
            submitState: observable.ref,
            currentFragment: observable,
            emailStatus: observable.ref,
            resendCountdown: observable,
            startResendCountdown: action,
        });
    }

    startResendCountdown() {
        this.resendCountdown = EmailOTPConst.resendDelay / 1000;
        const countdownInterval = setInterval(() => {
            runInAction(() => {
                this.resendCountdown -= 1;
                if (this.resendCountdown <= 0) {
                    clearInterval(countdownInterval);
                    this.resendCountdown = 0;
                }
            });
        }, 1000);
    }

    nameValidator = (value: string) => {
        value = value.trim();
        if (validator.isEmpty(value)) {
            return "Name is required";
        }
        if (!validator.isLength(value, { min: AppEntityConst.nameMinLength })) {
            return `Name must be at least ${AppEntityConst.nameMinLength} characters long`;
        }
        if (!validator.isLength(value, { max: AppEntityConst.nameMaxLength })) {
            return `Name must be at most ${AppEntityConst.nameMaxLength} characters long`;
        }
        return null;
    }

    emailValidator = (value: string) => {
        value = value.trim();
        if (validator.isEmpty(value)) {
            return "Email is required";
        }
        if (!validator.isEmail(value)) {
            return "Invalid email address";
        }
        if (!validator.isLength(value, { min: AppEntityConst.emailMinLength })) {
            return `Email must be at least ${AppEntityConst.emailMinLength} characters long`;
        }
        if (!validator.isLength(value, { max: AppEntityConst.emailMaxLength })) {
            return `Email must be at most ${AppEntityConst.emailMaxLength} characters long`;
        }
        return null;
    }

    mobileValidator = (value: string) => {
        value = value.trim();
        if (validator.isEmpty(value)) {
            return "Mobile number is required";
        }
        if (!validator.isNumeric(value)) {
            return "Invalid mobile number";
        }
        if (value.length != AppEntityConst.mobileLength) {
            return `Mobile number must be ${AppEntityConst.mobileLength} digits long`;
        }
        return null;
    }

    otpValidator = (value: string) => {
        value = value.trim();
        if (validator.isEmpty(value)) {
            return "OTP is required";
        }
        if (!validator.isNumeric(value)) {
            return "OTP must be numeric";
        }
        if (value.length !== AppEntityConst.emailOTPLength) {
            return `OTP must be exactly ${AppEntityConst.emailOTPLength} digits long`;
        }
        return null;
    }

    onClickBackInCollectDetails() {
        this.parentStore.setCurrentFragmentPreview();
    }

    async onClickNextInCollectDetails(dialogManager: DialogManagerStore) {
        if (this.submitState.isLoading) return;

        let hasError = false;
        for (const field of [this.name, this.email, this.mobile]) {
            const isValid = field.validate();
            if (!isValid) {
                hasError = true;
            }
        }
        if (hasError) return;

        try {
            runInAction(() => {
                this.submitState = DataState.loading();
            });

            showLoadingDialog({
                dialogManager,
                dialogId: "form-auth-collect-details",
                message: "Just a second...",
            });

            const getAppReq = new GetAppUserReq({
                formId: this.parentStore.formDetail.id,
                name: this.name.value,
                email: this.email.value,
                mobile: this.mobile.value,
            });

            const response = (await withMinDelay(this.formService.getAppUser(getAppReq))).getOrError();
            if (!response) return;

            if (response.isAppUserType) {
                await this.onAppUserRetrieved(response);
            } else if (response.isEmailVerificationRequired) {
                await this.onEmailVerificationRequired(response.data as number);
            } else {
                throw new Error("Unknown response type");
            }

            runInAction(() => {
                this.submitState = DataState.data(undefined);
            });
        } catch (error) {
            const appError = AppError.fromAny(error);
            logger.error("Error submitting user details:", appError);
            runInAction(() => {
                this.submitState = DataState.error(appError);
            });
            const isRateLimited = appError instanceof ApiError && appError.isRateLimited;
            showAppErrorDialog({
                dialogManager,
                appError,
                dialogId: "form-auth-collect-details-error",
                primaryButton: isRateLimited
                    ? {
                        text: "OK",
                        onClick: () => {
                            dialogManager.closeById("form-auth-collect-details-error");
                        },
                    }
                    : {
                        text: "Retry",
                        onClick: () => {
                            dialogManager.closeById("form-auth-collect-details-error");
                            this.onClickNextInCollectDetails(dialogManager);
                        },
                    },
            });
        }
        finally {
            dialogManager.closeById("form-auth-collect-details");
        }
    }


    onClickBackInVerifyEmail() {
        runInAction(() => {
            this.currentFragment = FormCurrentAuthFragment.CollectDetails;
        });
        this.otp.clearError();
        this.stopOtpPolling();
    }

    async onClickVerifyOTP(dialogManager: DialogManagerStore) {
        if (this.submitState.isLoading) return;

        const isValid = this.otp.validate();
        if (!isValid) return;

        try {
            runInAction(() => {
                this.verifyState = DataState.loading();
            });


            showLoadingDialog({
                dialogManager,
                dialogId: "form-auth-verify-otp",
                message: "Verifying OTP...",
            });

            const response = (
                await withMinDelay(
                    this.formService.verifyGetAppUser({
                        id: this.otpId!,
                        otp: this.otp.value,
                        formId: this.parentStore.formDetail.id,
                    })
                )
            ).getOrError();
            if (!response) return;

            await this.onVerificationSuccess(response);

            runInAction(() => {
                this.submitState = DataState.data(undefined);
            });
        } catch (error) {
            const appError = AppError.fromAny(error);
            logger.error("Error verifying OTP:", appError);

            runInAction(() => {
                this.verifyState = DataState.error(appError);
            });

            showAppErrorDialog({
                dialogManager,
                appError,
                dialogId: "form-auth-verify-otp-error",
                secondaryButton: {
                    text: "OK",
                    onClick: () => {
                        dialogManager.closeById("form-auth-verify-otp-error");
                    },
                },
            });
        } finally {
            dialogManager.closeById("form-auth-verify-otp");
        }
    }


    async onClickResendOTP(dialogManager: DialogManagerStore) {
        if (this.submitState.isLoading || this.resendCountdown > 0) return;

        try {
            runInAction(() => {
                this.submitState = DataState.loading();
            });

            this.stopOtpPolling();

            showLoadingDialog({
                dialogManager,
                dialogId: "form-auth-resend-otp",
                message: "Resending OTP...",
            });

            const response = (await withMinDelay(
                this.formService.resendSubmitFormOtp({
                    otpId: this.otpId!,
                    formId: this.parentStore.formDetail.id,
                })
            )).getOrError();

            if (!response) return;

            this.otpId = response;
            this.startOtpStatusPolling();

            runInAction(() => {
                this.submitState = DataState.data(undefined);
                this.startResendCountdown();
            });
        } catch (error) {
            const appError = AppError.fromAny(error);
            logger.error("Error resending OTP:", appError);

            runInAction(() => {
                this.submitState = DataState.error(appError);
            });

            showAppErrorDialog({
                dialogManager,
                appError,
                dialogId: "form-auth-resend-otp-error",
                secondaryButton: {
                    text: "OK",
                    onClick: () => {
                        dialogManager.closeById("form-auth-resend-otp-error");
                    },
                },
            });
        } finally {
            dialogManager.closeById("form-auth-resend-otp");
        }
    }




    private async onAppUserRetrieved(res: GetAppUserRes) {
        const successRes = res.data as GetAppUserSuccessRes;
        await this.parentStore.appStore.updateAuthResponse({ user: successRes.user, authToken: successRes.authToken });
        this.parentStore.setCurrentFragmentPreview();
        this.parentStore.startFormImmediatelyAfterLoadForm = true;
        await this.parentStore.loadFormDetail();
    }

    private async onEmailVerificationRequired(id: number) {
        this.otpId = id;
        runInAction(() => {
            this.otp.clearField("");
            this.currentFragment = FormCurrentAuthFragment.VerifyEmail;
        });
        this.startOtpStatusPolling();
    }

    private async onVerificationSuccess(res: GetAppUserRes) {
        this.stopOtpPolling();
        await this.onAppUserRetrieved(res);
    }

    private startOtpStatusPolling() {
        if (this.otpStatusTimer) {
            this.stopOtpPolling();
        }
        this.otpStatusTimer = setInterval(() => {
            this.checkOtpDeliveryStatus();
        }, 3000);
    }

    private stopOtpPolling() {
        if (this.otpStatusTimer) {
            clearInterval(this.otpStatusTimer);
            this.otpStatusTimer = null;
        }
        runInAction(() => {
            this.emailStatus = undefined;
        });
    }


    private async checkOtpDeliveryStatus() {
        if (!this.otpId) return;
        try {
            const response = (await this.parentStore.appStore.authService.checkAuthEmailOTPStatus(this.otpId)).getOrError();
            if (!response) return;
            this.stopOtpPolling();
            runInAction(() => {
                this.emailStatus = response;
            });
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            logger.error("Error checking OTP status for ID: ", this.otpId, " - Exception: ", appError);
            this.stopOtpPolling();
        }
    }

    dispose() {
        logger.debug("Disposing", this.instanceId);
        this.stopOtpPolling();
    }

}