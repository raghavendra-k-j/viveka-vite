import { makeObservable, observable } from "mobx";
import { FFieldContainer } from "~/ui/widgets/form/input/FFieldContainer";
import { FError } from "~/ui/widgets/form/FError";
import { RichPmEditor, RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { Trash2 } from 'lucide-react';
import React from "react";

export class ChoiceVm {
    ref: React.RefObject<RichPmEditorRef | null>;
    isCorrect: boolean;

    constructor({ ref, isCorrect }: { ref: React.RefObject<RichPmEditorRef | null>, isCorrect: boolean }) {
        this.ref = ref;
        this.isCorrect = isCorrect;
        makeObservable(this, {
            isCorrect: observable,
        });
    }

    render({
        isMultiple,
        index,
        choicesLength,
        onClickChoice,
        onRemoveChoice,
        stt
    }: {
        isMultiple: boolean,
        index: number,
        choicesLength: number,
        onClickChoice: (index: number) => void,
        onRemoveChoice: (index: number) => void,
        stt: any
    }) {
        return (
            <FFieldContainer>
                <div className="flex flex-row items-center gap-2">
                    <input
                        type={isMultiple ? "checkbox" : "radio"}
                        name="correctChoice"
                        checked={this.isCorrect}
                        onChange={() => onClickChoice(index)}
                        id={`correct-choice-${index}`}
                    />
                    <div className="flex-1">
                        <RichPmEditor
                            ref={this.ref}
                            placeholder={`Enter Choice ${index + 1}`}
                            schema={inlineSchema}
                            stt={stt}
                        />
                    </div>
                    {choicesLength > 2 && (
                        <button
                            type="button"
                            onClick={() => onRemoveChoice(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                            title="Remove choice"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
                <FError />
            </FFieldContainer>
        );
    }
}
