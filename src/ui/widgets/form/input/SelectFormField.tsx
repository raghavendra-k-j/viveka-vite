import React from "react";
import { Observer } from "mobx-react-lite";
import { Label, RequiredMarker } from "~/ui/widgets/form/Label";
import { FieldValue } from "../FieldValue";
import { Select } from "./Select";
import { ErrorMessage } from "../ErrorMessage";

export type SelectOption<T = any> = {
    data: T;
    value: (data: T) => string;
    label: (data: T) => string | React.ReactNode;
};

type SelectFormFieldProps<T = any> = React.HTMLAttributes<HTMLDivElement> & {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    field: FieldValue<string>;
    options: SelectOption<T>[];
    size?: "sm" | "md";
    placeholder?: string;
};

export function SelectFormField<T>({
    id,
    label,
    required = false,
    field,
    options,
    size = "md",
    placeholder,
    ...divProps
}: SelectFormFieldProps<T>) {
    const handleChange = (newVal: string) => {
        field.set(newVal);
    };

    return (
        <div className="flex flex-col gap-1" {...divProps}>
            {label && (
                <Label htmlFor={id}>
                    {label} {required && <RequiredMarker />}
                </Label>
            )}

            <Observer>
                {() => (
                    <Select
                        id={id}
                        value={field.value}
                        onChange={(e) => handleChange(e.target.value)}
                        size={size}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map(({ data, value, label }) => {
                            const val = value(data);
                            const lbl = label(data);
                            return (
                                <option key={val} value={val}>
                                    {lbl}
                                </option>
                            );
                        })}
                    </Select>
                )}
            </Observer>

            <Observer>
                {() => (field.error ? <ErrorMessage>{field.error}</ErrorMessage> : null)}
            </Observer>
        </div>
    );
}
