import React from "react";
import { Observer } from "mobx-react-lite";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FValue } from "../FValue";
import { FError } from "../FError";
import { FReqMark } from "../FReqMark";
import { FTextarea } from "./FTextArea";

type FTextAreaFieldProps = React.HTMLAttributes<HTMLDivElement> & {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    field: FValue<string>;
};

export function FTextareaField({
    id,
    label,
    required = false,
    placeholder,
    rows = 4,
    field,
    ...divProps
}: FTextAreaFieldProps) {
    const handleChange = (newVal: string) => {
        field.set(newVal);
    };

    return (
        <div className="flex flex-col gap-1" {...divProps}>
            {label && (
                <FLabel htmlFor={id}>
                    {label} {required && <FReqMark />}
                </FLabel>
            )}

            <Observer>
                {() => (
                    <FTextarea
                        id={id}
                        placeholder={placeholder}
                        rows={rows}
                        value={field.value}
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