import { Node as ProseMirrorNode } from 'prosemirror-model';
import { STT } from '~/infra/utils/stt/STT';
import './RichPmEditor.css';
import styles from "./styles.module.css";
import { Mic, SquareRadical } from 'lucide-react';
import { usePmEditor } from './useProseMirrorEditor';
import { RichPmEditorSchema } from './pm/schema';
import 'prosemirror-view/style/prosemirror.css';

export interface RichPmEditorProps {
    schema: RichPmEditorSchema;
    initialContent?: ProseMirrorNode | undefined;
    onChange?: (node: ProseMirrorNode) => void;
    stt: STT;
    placeholder?: string;
}


export type RichPmEditorRef = {
    getContent: () => ProseMirrorNode | null;
    setContent: (doc: ProseMirrorNode) => void;
}


import React, { forwardRef, useImperativeHandle } from 'react';



export const RichPmEditor = forwardRef(function RichPmEditor(
    props: RichPmEditorProps,
    ref: React.Ref<RichPmEditorRef>
) {
    const pm = usePmEditor(props);
    useImperativeHandle(ref, () => ({
        getContent: pm.getContent,
        setContent: pm.setContent,
    }));
    return (
        <div className={styles.richPmEditor}>
            <div className={styles.toolbar}>
                <button className={styles.button} onClick={pm.onClickEquationButton} title="Add Equation">
                    <SquareRadical className={styles.icon} /> Equation
                </button>
                <button className={styles.button} onClick={pm.onClickVoiceButton} title="Voice Input">
                    <Mic className={styles.icon} /> Voice
                </button>
            </div>
            <div
                data-placeholder="Type here..."
                className={styles.editorContent}
                onClick={pm.onClickEditableArea}
                ref={pm.editorRef}
            ></div>
        </div>
    );
});

