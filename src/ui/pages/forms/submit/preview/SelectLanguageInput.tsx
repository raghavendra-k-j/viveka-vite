import { FSelectField, FSelectOption } from "~/ui/widgets/form/input/FSelectField";
import { useSubmitStore } from "../SubmitContext";
import { Language } from "~/domain/forms/models/Language";
import { useMemo, useRef } from "react";
import { FValue } from "~/ui/widgets/form/FValue";
import { Observer } from "mobx-react-lite";

export function SelectLanguageInput() {
    const store = useSubmitStore();
    const { languages } = store.formDetail;

    const options: FSelectOption<Language>[] = useMemo(() =>
        languages.map((language) => ({
            data: language,
            value: (l) => l.id,
            label: (l) => l.name,
        })),
        [languages]
    );

    const field = useRef(new FValue<string>(store.selectedLanguage?.id || "", {}));
    return (
        <Observer>
            {() => (
                <FSelectField
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
