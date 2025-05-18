import { createContext, useContext } from "react";
import { FieldValue } from "./FieldValue";

interface FormFieldContextValue<T> {
    field: FieldValue<T>;
    inputId: string;
}

export const FormFieldContext = createContext<FormFieldContextValue<any> | null>(null);

export function useFormField<T>() {
    const ctx = useContext(FormFieldContext);
    if (!ctx) throw new Error("useFormField must be used within a <FormField>");
    return ctx as FormFieldContextValue<T>;
}