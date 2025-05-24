import type { ReactNode } from "react";

export type FCheckboxInputProps = {
    value: boolean;
    id?: string;
    className?: string;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
};

export const FCheckboxInput = ({ value, id, className = '', disabled, onChange }: FCheckboxInputProps) => {
    return (
        <input
            id={id}
            type="checkbox"
            checked={value}
            onChange={e => onChange?.(e.target.checked)}
            disabled={disabled}
            className={`h-4 w-4 text-default ${className}`}
        />
    );
};

export type FCheckboxProps = {
    value: boolean;
    onChange: (checked: boolean) => void;
    label?: string | ReactNode;
    id?: string;
    labelPosition?: "left" | "right";
    className?: string;
    inputProps?: Omit<FCheckboxInputProps, "value" | "onChange">;
};

export const FCheckbox = ({
    value,
    onChange,
    label,
    id,
    labelPosition = "right",
    className = "",
    inputProps = {}
}: FCheckboxProps) => {
    const labelContent = label ? (
        <span className="text-sm text-default">{label}</span>
    ) : null;

    return (
        <label htmlFor={id} className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
            {labelPosition === "left" && labelContent}
            <FCheckboxInput
                value={value}
                id={id}
                onChange={onChange}
                {...inputProps}
            />
            {labelPosition === "right" && labelContent}
        </label>
    );
};