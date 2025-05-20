import React, { } from 'react';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { STT } from '~/infra/utils/stt/STT';
import './RichPmEditor.css';
import styles from "./styles.module.css";
import { Mic, SquareRadical } from 'lucide-react';
import { usePmEditor } from './useProseMirrorEditor';

export interface RichPmEditorProps {
    initialContent?: string;
    onChange?: (node: ProseMirrorNode) => void;
    getContent?: () => ProseMirrorNode;
    stt: STT;
    placeholder?: string;
}

const RichPmEditor: React.FC<RichPmEditorProps> = (props) => {
    const pm = usePmEditor(props);
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
};

export default RichPmEditor;