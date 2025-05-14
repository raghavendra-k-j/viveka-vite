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
} from 'lucide-react';
import { useMathDialog } from './useMathDialog';
import { useAiListenDialog } from './useAiListenDialog';
import type { STT } from '~/infra/utils/stt/STT';

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
        <div className="w-full">
            <RichEditorToolbar
                editorRef={editorRef}
                formats={formats}
                openMathDialog={openMathDialog}
                openAiListenDialog={openAiListenDialog}
            />

            <Editor
                tinymceScriptSrc="/packages/tinymce/tinymce.min.js"
                licenseKey="gpl"
                onInit={(_, editor) => {
                    editorRef.current = editor;

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
                        const wrapper = target.closest('.math-equation');
                        if (wrapper) {
                            const latex = wrapper.getAttribute('data-latex') || '';
                            e.preventDefault();
                            e.stopPropagation();
                            openMathDialog(latex, wrapper);
                        }
                    });
                }}
                init={{
                    height: 200,
                    menubar: false,
                    inline: true,
                    toolbar: false,
                    plugins: ['lists'],
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

// ✅ DRY Toolbar Component
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
        `p-1 rounded hover:bg-gray-100 ${active ? 'text-blue-600' : 'text-gray-600'}`;

    const toolbarButtons = [
        { icon: Bold, title: 'Bold', command: 'Bold', formatKey: 'bold' },
        { icon: Italic, title: 'Italic', command: 'Italic', formatKey: 'italic' },
        { icon: Underline, title: 'Underline', command: 'Underline', formatKey: 'underline' },
        { icon: List, title: 'Unordered List', command: 'InsertUnorderedList', formatKey: 'bullist' },
        { icon: ListOrdered, title: 'Ordered List', command: 'InsertOrderedList', formatKey: 'numlist' },
    ];

    return (
        <div className="flex gap-2 mb-2 items-center">
            {toolbarButtons.map(({ icon: Icon, title, command, formatKey }) => (
                <button
                    key={command}
                    type="button"
                    className={getButtonClass(formats[formatKey])}
                    onClick={() => applyCommand(command)}
                    title={title}
                >
                    <Icon size={18} />
                </button>
            ))}
            <button
                type="button"
                className="p-1 rounded hover:bg-gray-100 text-gray-600"
                onClick={() => openMathDialog('')}
                title="Insert Equation"
            >
                <SquareRadical size={18} />
            </button>
            <button
                type="button"
                className="p-1 rounded hover:bg-gray-100 text-gray-600"
                onClick={openAiListenDialog}
                title="Speech Input"
            >
                <Mic size={18} />
            </button>
        </div>
    );
}
