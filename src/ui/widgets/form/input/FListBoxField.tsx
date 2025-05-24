import React from "react";
import { Observer } from "mobx-react-lite";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FValue } from "../FValue";
import { FError } from "../FError";
import { FReqMark } from "../FReqMark";
import { FInputSize } from "./FInputSize";
import { FListBox } from "./FListBox";
import clsx from "clsx";

export type FListBoxFieldProps<T> = React.HTMLAttributes<HTMLDivElement> & {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    field: FValue<T | null>;
    items: T[] | ReadonlyArray<T>;
    itemRenderer: (item: T) => React.ReactNode | string;
    itemKey: (item: T) => string | number;
    buttonRenderer?: (item: T) => React.ReactNode | string;
    inputSize?: FInputSize;
    placeholder?: string | React.ReactNode;
    disabled?: boolean;
    onValueChange: (value: T | null) => void;
    className?: string;
};

export function FListBoxField<T>({
    id,
    label,
    required = false,
    field,
    items,
    itemRenderer,
    itemKey,
    buttonRenderer,
    inputSize = "md",
    placeholder = "Select an option",
    disabled = false,
    onValueChange,
    className = "",
    ...divProps
}: FListBoxFieldProps<T>) {
    const handleChange = (val: T | null) => {
        onValueChange(val);
    };

    return (
        <div className={clsx("flex flex-col gap-1", className)} {...divProps}>
            {label && (
                <FLabel inputSize={inputSize} htmlFor={id}>
                    {label} {required && <FReqMark />}
                </FLabel>
            )}

            <Observer>
                {() => (
                    <FListBox
                        items={items}
                        itemRenderer={itemRenderer}
                        itemKey={itemKey}
                        buttonRenderer={buttonRenderer}
                        value={field.value}
                        onValueChange={handleChange}
                        inputSize={inputSize}
                        placeholder={placeholder}
                        disabled={disabled}
                        id={id}
                    />
                )}
            </Observer>

            <Observer>
                {() => (field.error ? <FError>{field.error}</FError> : null)}
            </Observer>
        </div>
    );
}
