import { useCallback } from 'react';
import katex from 'katex';
import { LaTexExpr } from '~/domain/latexkb/models/LaTexExpr';
import { DialogEntry, useDialogManager } from '~/ui/widgets/dialogmanager';
import { LatexKb } from '../LaTexKb/LaTexKb';
import { LaTexKbProps } from '../LaTexKb/LaTexKbProvider';
import type { STT } from '~/infra/utils/stt/STT';
import type { Editor as TinyMCEEditor } from 'tinymce';

export function useMathDialog(
    editorRef: React.RefObject<TinyMCEEditor | null>,
    stt: STT
) {
    const dialogManager = useDialogManager();

    return useCallback((latex: string, targetNode?: Node) => {
        const dialogEntry: DialogEntry<LaTexKbProps> = {
            id: 'math-dialog',
            component: LatexKb,
            props: {
                expr: new LaTexExpr({ latex }),
                onDone: (expr: LaTexExpr) => {
                    const content = `<span class="latex" contenteditable="false" data-latex="${expr.latex}">${expr.latex}</span>`;
                    if (targetNode) {
                        editorRef.current?.dom.setOuterHTML(targetNode as HTMLElement, content);
                    } else {
                        editorRef.current?.insertContent(content, { format: 'html' });
                    }
                    const container = editorRef.current?.getBody();
                    if (container) {
                        renderLatexElements(container);
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



export function renderLatexElements(container: HTMLElement) {
    const nodes = container.querySelectorAll('.latex');
    nodes.forEach((node) => {
        const latex = node.getAttribute('data-latex') || node.textContent || '';
        try {
            katex.render(latex, node as HTMLElement, {
                throwOnError: false,
                output: 'html',
            });
        } catch {
            node.textContent = latex;
        }
    });
}
