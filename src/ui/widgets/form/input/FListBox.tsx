import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { FInputSize } from "./FInputSize";

export interface FListBoxProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: T[] | ReadonlyArray<T>;
    itemRenderer: (item: T) => React.ReactNode | string;
    itemKey: (item: T) => string | number;
    buttonRenderer?: (item: T) => React.ReactNode | string;
    value: T | null;
    onValueChange?: (value: T | null) => void;
    disabled?: boolean;
    inputSize?: FInputSize;
    placeholder?: string | React.ReactNode;
    allowEmpty?: boolean;
}

export function FListBox<T>({
    items,
    itemRenderer,
    itemKey,
    buttonRenderer,
    value,
    onValueChange,
    className = "",
    disabled = false,
    inputSize = "md",
    placeholder = "Select an option",
    allowEmpty = true,
    ...rest
}: FListBoxProps<T>) {
    return (
        <Listbox value={value} onChange={onValueChange} disabled={disabled}>
            <div
                className={`flistbox flistbox--${inputSize} ${className}`}
                {...rest}
            >
                <ListboxButton className="flistbox__button">
                    {value
                        ? buttonRenderer?.(value) ?? itemRenderer(value)
                        : placeholder}
                </ListboxButton>

                <ListboxOptions className="flistbox__options">
                    <ListboxOption
                        key="placeholder"
                        value={null}
                        disabled={!allowEmpty}
                        className="flistbox__option flistbox__option--placeholder"
                    >
                        {placeholder}
                    </ListboxOption>
                    {items.map((item) => (
                        <ListboxOption
                            key={itemKey(item)}
                            value={item}
                            className="flistbox__option"
                        >
                            {itemRenderer(item)}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
