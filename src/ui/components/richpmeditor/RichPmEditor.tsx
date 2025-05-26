import { Node as ProseMirrorNode } from 'prosemirror-model';
import { STT } from '~/infra/utils/stt/STT';
import './RichPmEditor.css';
import styles from "./styles.module.css";
import { Mic, SquareRadical } from 'lucide-react';
import { usePmEditor } from './useProseMirrorEditor';
import { RichPmEditorSchema } from './pm/schema';
import React, { forwardRef, useImperativeHandle } from 'react';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';

export interface RichPmEditorProps {
    schema: RichPmEditorSchema;
    initialContent?: ProseMirrorNode | null;
    onChange?: (node: ProseMirrorNode, instanceId: string) => void;
    stt: STT;
    placeholder?: string;
    minHeight?: string;
    maxHeight?: string;
}

export type RichPmEditorRef = {
    getContent: () => ProseMirrorNode | null;
    setContent: (doc: ProseMirrorNode) => void;
    insertBlank: () => void;
    viewRef: React.RefObject<EditorView | null>;
    addChangeListener: (listener: (node: ProseMirrorNode) => void) => void;
    removeChangeListener: (listener: (node: ProseMirrorNode) => void) => void;
    instanceId: string;
}

export const RichPmEditor = forwardRef(function RichPmEditor(props: RichPmEditorProps, ref: React.Ref<RichPmEditorRef>) {
    const pm = usePmEditor(props);

    useImperativeHandle(ref, () => ({
        getContent: pm.getContent,
        setContent: pm.setContent,
        insertBlank: pm.insertBlank,
        viewRef: pm.viewRef,
        addChangeListener: pm.addChangeListener,
        removeChangeListener: pm.removeChangeListener,
        instanceId: pm.instanceId,
    }));


    return (
        <div className={styles.richPmEditor}>
            <div className={styles.toolbar}>
                <button className={styles.button} onClick={pm.onClickEquationButton} title="Add Equation">
                    <SquareRadical className={styles.icon} /> Equation
                </button>
                <button className={styles.button} onClick={pm.onClickVoiceButton} title="Voice Input">
                    <Mic className={styles.icon} /> Dictate
                </button>
            </div>
            <div
                className={styles.editorContent}
                onClick={pm.onClickEditableArea}
                ref={pm.editorRef}
                style={{
                    minHeight: props.minHeight,
                    maxHeight: props.maxHeight,
                }}
            ></div>
        </div>
    );
});

