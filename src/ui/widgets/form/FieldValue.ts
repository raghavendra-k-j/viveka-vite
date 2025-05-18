import { makeObservable, observable, action } from "mobx";

type ValidatorFn<T> = (value: T) => string | null;

type FieldValueOptions<T> = {
    validator?: ValidatorFn<T>;
};

export class FieldValue<T> {
    value: T;
    error?: string;
    validator?: ValidatorFn<T>;

    constructor(initialValue: T, options?: FieldValueOptions<T>) {
        this.value = initialValue;
        this.validator = options?.validator;

        makeObservable(this, {
            value: observable,
            error: observable,
            set: action,
            validate: action,
            clearError: action,
            clearField: action,
        });
    }

    set(newVal: T) {
        this.value = newVal;
        if (this.validator) {
            this.error = this.validator(newVal) || undefined;
        }
    }

    validate(): boolean {
        if (!this.validator) {
            this.error = undefined;
            return true;
        }
        const validationError = this.validator(this.value);
        this.error = validationError || undefined;
        return !validationError;
    }

    clearError() {
        this.error = undefined;
    }

    clearField(value: T) {
        this.value = value;
        this.error = undefined;
    }


}
