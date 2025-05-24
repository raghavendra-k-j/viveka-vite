import React from "react";
import { Observer } from "mobx-react-lite";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FValue } from "../FValue";
import { FError } from "../FError";
import { FSelect } from "./FSelect";
import { FReqMark } from "../FReqMark";
import { FInputSize } from "./FInputSize";

export type FSelectOption<T = any> = {
    data: T;
    value: (data: T) => string;
    label: (data: T) => string | React.ReactNode;
};

type FSelectFieldProps<T = any> = React.HTMLAttributes<HTMLDivElement> & {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    field: FValue<string>;
    options: FSelectOption<T>[];
    inputSize?: FInputSize;
    placeholder?: string;
};

export function FSelectField<T>({
    id,
    label,
    required = false,
    field,
    options,
    inputSize = "md",
    placeholder,
    ...divProps
}: FSelectFieldProps<T>) {
    const handleChange = (newVal: string) => {
        field.set(newVal);
    };

    return (
        <div className="flex flex-col gap-1" {...divProps}>
            {label && (
                <FLabel inputSize={inputSize} htmlFor={id}>
                    {label} {required && <FReqMark />}
                </FLabel>
            )}

            <Observer>
                {() => {
                    return (
                        <FSelect
                            id={id}
                            value={field.value}
                            onChange={(e) => handleChange(e.target.value)}
                            inputSize={inputSize}
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
                        </FSelect>
                    );
                }}
            </Observer>

            <Observer>
                {() => (field.error ? <FError>{field.error}</FError> : null)}
            </Observer>
        </div>
    );
}
