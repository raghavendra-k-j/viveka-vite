type AssmntMarksPolicyProps = {
    value: string;
}

export class AssmntMarksPolicy {

    public readonly value: string;

    constructor({ value }: AssmntMarksPolicyProps) {
        this.value = value;
    }

    static readonly required = new AssmntMarksPolicy({ value: "required" });
    static readonly optional = new AssmntMarksPolicy({ value: "optional" });
    static readonly notAllowed = new AssmntMarksPolicy({ value: "notAllowed" });

    get isRequired(): boolean {
        return this === AssmntMarksPolicy.required;
    }

    get isOptional(): boolean {
        return this === AssmntMarksPolicy.optional;
    }

    get isNotAllowed(): boolean {
        return this === AssmntMarksPolicy.notAllowed;
    }
}
