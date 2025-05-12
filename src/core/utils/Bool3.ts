/**
 * Represents a tri-state boolean logic with three possible values:
 * - T (true)
 * - F (false)
 * - N (none/undefined)
 *
 * It mimics enum-like behavior using frozen instances.
 */
export class Bool3 {
    /**
     * Represents the `true` state.
     */
    static readonly T = Object.freeze(new Bool3('T'));

    /**
     * Represents the `false` state.
     */
    static readonly F = Object.freeze(new Bool3('F'));

    /**
     * Represents the `none` (undefined/null) state.
     */
    static readonly N = Object.freeze(new Bool3('N'));

    /**
     * All possible Bool3 values for iteration or validation.
     */
    static readonly values = Object.freeze([Bool3.T, Bool3.F, Bool3.N]);

    /**
     * Internal string representation ('T', 'F', or 'N').
     */
    readonly value: string;

    /**
     * Private constructor to restrict instance creation.
     * Use the predefined static instances instead.
     * @param value The string representation of the Bool3 value.
     */
    private constructor(value: string) {
        this.value = value;
    }

    /**
     * Returns the string representation of the Bool3 value.
     */
    toString(): string {
        return this.value;
    }

    /**
     * Checks if the current value is `true`.
     */
    get isTrue(): boolean {
        return this === Bool3.T;
    }

    /**
     * Checks if the current value is NOT `true`.
     */
    get isNotTrue(): boolean {
        return this !== Bool3.T;
    }

    /**
     * Checks if the current value is `false`.
     */
    get isFalse(): boolean {
        return this === Bool3.F;
    }

    /**
     * Checks if the current value is NOT `false`.
     */
    get isNotFalse(): boolean {
        return this !== Bool3.F;
    }

    /**
     * Checks if the current value is `none`.
     */
    get isNone(): boolean {
        return this === Bool3.N;
    }

    /**
     * Checks if the current value is NOT `none`.
     */
    get isNotNone(): boolean {
        return this !== Bool3.N;
    }

    /**
     * Returns the logical inverse of `T` and `F`.
     * `T` becomes `F`, `F` becomes `T`, `N` remains `T`.
     */
    get inverse(): Bool3 {
        return this === Bool3.T ? Bool3.F : Bool3.T;
    }

    /**
     * Returns a native `boolean` or `null` equivalent of the current value.
     * - `T` → `true`
     * - `F` → `false`
     * - `N` → `null`
     */
    get boolValue(): boolean | null {
        if (this === Bool3.T) return true;
        if (this === Bool3.F) return false;
        return null;
    }

    /**
     * Returns `T` if `true`, else `N`.
     * @param value A native boolean or null/undefined
     */
    static trueOrNone(value: boolean | null | undefined): Bool3 {
        return value === true ? Bool3.T : Bool3.N;
    }

    /**
     * Returns `F` if `false`, else `N`.
     * @param value A native boolean or null/undefined
     */
    static falseOrNone(value: boolean | null | undefined): Bool3 {
        return value === false ? Bool3.F : Bool3.N;
    }

    /**
     * Converts a non-nullable boolean into `T` or `F`.
     * @param value A non-nullable boolean
     */
    static fromBool(value: boolean): Bool3 {
        return value ? Bool3.T : Bool3.F;
    }

    /**
     * Converts a nullable boolean into `T`, `F`, or `N`.
     * @param value A nullable boolean
     */
    static bool(value: boolean | null | undefined): Bool3 {
        if (value == null) return Bool3.N;
        return value ? Bool3.T : Bool3.F;
    }

    /**
     * Toggles the current value between `T` and `F`.
     * If the current value is `T`, returns `F`, and vice versa.
     * @returns The toggled Bool3 value.
     */
    toggleTrueFalse(): Bool3 {
        return this === Bool3.T ? Bool3.F : Bool3.T;
    }
}
