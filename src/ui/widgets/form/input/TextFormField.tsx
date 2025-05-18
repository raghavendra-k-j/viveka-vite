import React from "react";
import { Observer } from "mobx-react-lite";
import { Label, RequiredMarker, ErrorMessage } from "~/ui/widgets/form/Label";
import { Input } from "~/ui/widgets/form/input/Input";
import { FieldValue } from "../FieldValue";

type TextFormFieldProps = {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    type?: string;
    placeholder?: string;
    field: FieldValue<string>;
};

export function TextFormField({
    id,
    label,
    required = false,
    type = "text",
    placeholder,
    field,
}: TextFormFieldProps) {
    const handleChange = (newVal: string) => {
        field.set(newVal);
    };

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <Label htmlFor={id}>
                    {label} {required && <RequiredMarker />}
                </Label>
            )}

            <Observer>
                {() => (
                    <Input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={field.value}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Observer>

            <Observer>
                {() => (field.error ? <ErrorMessage>{field.error}</ErrorMessage> : null)}
            </Observer>
        </div>
    );
}
