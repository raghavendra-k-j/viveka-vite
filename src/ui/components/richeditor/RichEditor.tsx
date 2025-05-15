import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    SquareRadical,
    Mic,
    Code,
} from 'lucide-react';
import { useMathDialog, renderLatexElements } from './useMathDialog';
import { useAiListenDialog } from './useAiListenDialog';
import type { STT } from '~/infra/utils/stt/STT';
import clsx from 'clsx';
import styles from './RichEditor.module.css';
import './rich-editor.css';
import { logger } from '~/core/utils/logger';

export function RichEditor({ stt }: { stt: STT }) {
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [formats, setFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        bullist: false,
        numlist: false,
    });

    const openMathDialog = useMathDialog(editorRef, stt);
    const openAiListenDialog = useAiListenDialog(stt, editorRef);

    return (
        <div className={clsx(styles.richEditor)}>
            <RichEditorToolbar
                editorRef={editorRef}
                formats={formats}
                openMathDialog={openMathDialog}
                openAiListenDialog={openAiListenDialog}
            />

            <Editor
                initialValue='<div><user email="16102000.raghu@gmail.com"/></div>'
                tinymceScriptSrc="/packages/tinymce/tinymce.min.js"
                licenseKey="gpl"
                onInit={(_, editor) => {
                    editorRef.current = editor;

                    // Handle formatting states
                    editor.on('NodeChange', () => {
                        setFormats({
                            bold: editor.queryCommandState('Bold'),
                            italic: editor.queryCommandState('Italic'),
                            underline: editor.queryCommandState('Underline'),
                            bullist: editor.queryCommandState('InsertUnorderedList'),
                            numlist: editor.queryCommandState('InsertOrderedList'),
                        });
                    });

                    editor.on('click', (e) => {
                        const target = e.target as HTMLElement;
                        logger.debug('Double clicked:', target);
                    });
                    renderLatexElements(editor.getBody());
                }}
                init={{
                    height: 200,
                    menubar: false,
                    inline: true,
                    toolbar: ['math'],
                    plugins: ['lists', 'code'],
                    statusbar: false,
                    extended_valid_elements: '*[*]',
                    valid_elements: '*[*]',
                    verify_html: false,
                    content_css: [
                        '/packages/katex/katex.min.css',
                        '/assets/css/rich-editor.css',
                    ],
                }}
            />
        </div>
    );
}

function RichEditorToolbar({
    editorRef,
    formats,
    openMathDialog,
    openAiListenDialog,
}: {
    editorRef: React.RefObject<TinyMCEEditor | null>;
    formats: Record<string, boolean>;
    openMathDialog: (latex: string, target?: HTMLElement) => void;
    openAiListenDialog: () => void;
}) {
    const applyCommand = (cmd: string) => {
        editorRef.current?.execCommand(cmd);
    };

    const getButtonClass = (active: boolean) =>
        clsx(styles.toolbarButton, active ? 'text-blue-600' : 'text-gray-600');

    const toolbarButtons = [
        { icon: Bold, title: 'Bold', command: 'Bold', formatKey: 'bold' },
        { icon: Italic, title: 'Italic', command: 'Italic', formatKey: 'italic' },
        { icon: Underline, title: 'Underline', command: 'Underline', formatKey: 'underline' },
        { icon: List, title: 'Unordered List', command: 'InsertUnorderedList', formatKey: 'bullist' },
        { icon: ListOrdered, title: 'Ordered List', command: 'InsertOrderedList', formatKey: 'numlist' },
    ];

    const iconSize = 16;

    return (
        <div className={clsx(styles.toolbar)}>
            {toolbarButtons.map(({ icon: Icon, title, command, formatKey }) => (
                <button
                    key={command}
                    type="button"
                    className={getButtonClass(formats[formatKey])}
                    onClick={() => applyCommand(command)}
                    title={title}
                >
                    <Icon strokeWidth={2} size={iconSize} />
                </button>
            ))}
            <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => openMathDialog('')}
                title="Insert Equation"
            >
                <SquareRadical size={iconSize} />
            </button>
            <button
                type="button"
                className={styles.toolbarButton}
                onClick={openAiListenDialog}
                title="Speech Input"
            >
                <Mic size={iconSize} />
            </button>
            <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => editorRef.current?.execCommand('mceCodeEditor')}
                title="View Source Code"
            >
                <Code size={iconSize} />
            </button>
        </div>
    );
}
