import React from "react";
import { Observer } from "mobx-react-lite";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FValue } from "../FValue";
import { FError } from "../FError";
import { FReqMark } from "../FReqMark";
import { FInput } from "./FInput";
import { FInputSize } from "./FInputSize";

type FTextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    type?: string;
    placeholder?: string;
    field: FValue<string>;
    inputSize?: FInputSize;
};

export function FTextField({
    id,
    label,
    required = false,
    type = "text",
    placeholder,
    field,
    inputSize = "md",
    ...divProps
}: FTextFieldProps) {
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
                {() => (
                    <FInput
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={field.value}
                        inputSize={inputSize}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Observer>

            <Observer>
                {() => (field.error ? <FError>{field.error}</FError> : null)}
            </Observer>
        </div>
    );
}
