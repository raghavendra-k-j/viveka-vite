import { useCallback } from 'react';
import katex from 'katex';
import { LaTexExpr } from '~/domain/latexkb/models/LaTexExpr';
import { DialogEntry, useDialogManager } from '~/ui/widgets/dialogmanager';
import { LatexKb } from '../LaTexKb/LaTexKb';
import { LaTexKbProps } from '../LaTexKb/LaTexKbProvider';
import type { STT } from '~/infra/utils/stt/STT';
import type { Editor as TinyMCEEditor } from 'tinymce';

export function useMathDialog(editorRef: React.RefObject<TinyMCEEditor | null>, stt: STT) {
    const dialogManager = useDialogManager();

    return useCallback((latex: string, targetNode?: Node) => {
        const dialogEntry: DialogEntry<LaTexKbProps> = {
            id: 'math-dialog',
            component: LatexKb,
            props: {
                expr: new LaTexExpr({ latex }),
                onDone: (expr: LaTexExpr) => {
                    const mathHtml = katex.renderToString(expr.latex, {
                        throwOnError: false,
                        output: 'html',
                    });

                    const content = `<span class="math-equation" contenteditable="false" data-latex="${expr.latex}">${mathHtml}</span>`;

                    if (targetNode) {
                        editorRef.current?.dom.setOuterHTML(targetNode as HTMLElement, content);
                    } else {
                        editorRef.current?.insertContent(content, { format: 'html' });
                    }

                    dialogManager.closeById('math-dialog');
                },
                onClose: () => dialogManager.closeById('math-dialog'),
                stt,
            },
        };

        dialogManager.show(dialogEntry);
    }, [dialogManager, editorRef, stt]);
}
