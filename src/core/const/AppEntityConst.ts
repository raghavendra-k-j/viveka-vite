export class AppEntityConst {
    private constructor() { }

    static readonly nameMinLength = 3;
    static readonly nameMaxLength = 60;

    static readonly emailMinLength = 6;
    static readonly emailMaxLength = 60;

    static readonly countryCodeMaxLength = 3;
    static readonly mobileLength = 10;

    static readonly userNameMinLength = 3;
    static readonly userNameMaxLength = 30;

    static readonly passwordMinLength = 8;
    static readonly passwordMaxLength = 20;
    static readonly passwordHashedMaxLength = 60;

    static readonly addressMinLength = 5;
    static readonly addressMaxLength = 500;

    static readonly emailOTPLength = 6;

    static readonly passwordUppercasePattern = /[A-Z]/;
    static readonly passwordLowercasePattern = /[a-z]/;
    static readonly passwordDigitPattern = /[0-9]/;
    static readonly passwordSpecialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    static readonly passwordUppercaseRegex = AppEntityConst.passwordUppercasePattern;
    static readonly passwordLowercaseRegex = AppEntityConst.passwordLowercasePattern;
    static readonly passwordDigitRegex = AppEntityConst.passwordDigitPattern;
    static readonly passwordSpecialCharRegex = AppEntityConst.passwordSpecialCharPattern;
}