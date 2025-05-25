import { makeObservable, observable } from "mobx";
import { FFieldContainer } from "~/ui/widgets/form/input/FFieldContainer";
import { FError } from "~/ui/widgets/form/FError";
import { RichPmEditor, RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { Trash2 } from 'lucide-react';
import React, { createRef, useEffect } from "react";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { Observer } from "mobx-react-lite";
import { UUIDUtil } from "~/core/utils/UUIDUtil";
import { useStt } from "~/ui/components/sttcontext/STTContext";

export type ChoiceEnAVmProps = {
    selected: boolean;
    doc: ProseMirrorNode | null;
}

export class ChoiceEnAVm {
    uid: string = UUIDUtil.compact;
    ref: React.RefObject<RichPmEditorRef | null>;
    selected: boolean | null;
    doc: ProseMirrorNode | null;

    constructor(props: ChoiceEnAVmProps) {
        this.ref = createRef<RichPmEditorRef | null>();
        this.selected = props.selected;
        this.doc = props.doc;
        makeObservable(this, {
            selected: observable,
            onNodeChanged: observable,
        });
    }

    onNodeChanged(node: ProseMirrorNode | null) {
        this.doc = node;
    }
}


export type ChoiceEnAViewProps = {
    vm: ChoiceEnAVm;
    isCheckbox: boolean;
    index: number;
    scorable: boolean;
    choicesLength: number;
    onClickControl: (index: number) => void;
    onClickRemove?: (index: number) => void;
    placeholder: (index: number) => string;
}

export function ChoiceEnAView(props: ChoiceEnAViewProps) {
    const stt = useStt();


    useEffect(() => {
        const editor = props.vm.ref.current;
        if (!editor) return;

        const handleNodeChange = (node: ProseMirrorNode | null) => {
            props.vm.onNodeChanged(node);
        };

        editor.addChangeListener(handleNodeChange);
        return () => {
            editor.removeChangeListener(handleNodeChange);
        };
    }, [props.vm]);

    return (
        <FFieldContainer>
            <div className="flex flex-row items-center gap-2">

                {/* Control */}
                <Observer>
                    {() => {
                        if (!props.scorable) return null;
                        return (
                            <ControlInput
                                isMultiple={props.isCheckbox}
                                vm={props.vm}
                                index={props.index}
                                onClickChoice={props.onClickControl}
                            />
                        );
                    }}
                </Observer>

                {/* Editor  */}
                <div className="flex-1">
                    <RichPmEditor
                        ref={props.vm.ref}
                        placeholder={props.placeholder(props.index)}
                        schema={inlineSchema}
                        stt={stt}
                        initialContent={props.vm.doc}
                    />
                </div>

                {/* Remove Button */}
                {props.onClickRemove && props.choicesLength > 2 && (
                    <RemoveIcon
                        onClick={() => props.onClickRemove?.(props.index)}
                    />
                )}

            </div>
            <FError />
        </FFieldContainer>
    );
}

function RemoveIcon({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="ml-2 text-error"
            title="Remove choice"
        >
            <Trash2 size={16} />
        </button>
    );
}

function ControlInput({ isMultiple, vm, index, onClickChoice }: { isMultiple: boolean, vm: ChoiceEnAVm, index: number, onClickChoice: (index: number) => void }) {
    return (
        <input
            type={isMultiple ? "checkbox" : "radio"}
            name="correctChoice"
            checked={vm.selected!}
            onChange={() => onClickChoice(index)}
            id={`correct-choice-${index}`}
        />
    );
}
