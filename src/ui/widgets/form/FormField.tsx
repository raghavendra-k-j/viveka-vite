import { ReactNode, useId } from "react";
import { FieldValue } from "./FieldValue";
import { FormFieldContext } from "./FormFieldContext";


interface FormFieldProps<T> {
    field: FieldValue<T>;
    children: ReactNode;
}

export function FormField<T>({ field, children }: FormFieldProps<T>) {
    const inputId = useId();

    return (
        <FormFieldContext.Provider value={{ field, inputId }}>
            {children}
        </FormFieldContext.Provider>
    );
}
