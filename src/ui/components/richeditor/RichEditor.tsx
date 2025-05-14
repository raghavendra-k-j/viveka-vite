import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import type { STT } from '~/infra/utils/stt/STT';
import { useMathDialog } from './useMathDialog';
import { useVoiceDialog } from './useVoiceDialog';
import { useAiListenDialog } from './useAiListenDialog';


interface RichEditorProps {
    stt: STT;
}

export function RichEditor({ stt }: RichEditorProps) {
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const openMathDialog = useMathDialog(editorRef, stt);
    const openVoiceDialog = useVoiceDialog(stt, editorRef);
    const openAiListenDialog = useAiListenDialog(stt, editorRef);

    const initMathPlugin = (editor: TinyMCEEditor) => {
        editor.ui.registry.addButton('math', {
            text: 'Equation',
            tooltip: 'Insert Equation',
            onAction: () => openMathDialog(''),
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
    };

    const initListenPlugin = (editor: TinyMCEEditor) => {
        editor.ui.registry.addButton('listen', {
            text: 'Listen',
            tooltip: 'Voice Input',
            onAction: openVoiceDialog,
        });
    };


    const initAiListenPlugin = (editor: TinyMCEEditor) => {
        editor.ui.registry.addButton('ai-listen', {
            text: 'AI Listen',
            tooltip: 'AI Voice Input',
            onAction: openAiListenDialog,
        });
    }


    return (
        <div className="w-full">
            <Editor
                tinymceScriptSrc="/packages/tinymce/tinymce.min.js"
                licenseKey="gpl"
                onInit={(_evt, editor) => {
                    editorRef.current = editor;
                    initMathPlugin(editor);
                    initListenPlugin(editor);
                    initAiListenPlugin(editor);
                }}
                init={{
                    height: 200,
                    menubar: false,
                    plugins: ['lists'],
                    toolbar: 'bold italic underline | bullist numlist | math listen ai-listen',
                    statusbar: false,
                    toolbar_mode: 'scrolling',
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
