import { SelectFormField, SelectOption } from "~/ui/widgets/form/input/SelectFormField";
import { useSubmitStore } from "../SubmitContext";
import { Language } from "~/domain/forms/models/Language";
import { useMemo, useRef } from "react";
import { FieldValue } from "~/ui/widgets/form/FieldValue";
import { Observer } from "mobx-react-lite";

export function SelectLanguageInput() {
    const store = useSubmitStore();
    const { languages } = store.formDetail;

    const options: SelectOption<Language>[] = useMemo(() =>
        languages.map((language) => ({
            data: language,
            value: (l) => l.id,
            label: (l) => l.name,
        })),
        [languages]
    );

    const field = useRef(new FieldValue<string>(store.selectedLanguage?.id || "", {}));
    return (
        <Observer>
            {() => (
                <SelectFormField
                    id="form-language-select"
                    label="Select Language"
                    required
                    field={field.current}
                    options={options}
                    placeholder="Please select a language"
                />
            )}
        </Observer>
    );
}
