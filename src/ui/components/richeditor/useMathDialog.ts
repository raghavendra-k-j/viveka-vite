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
    const nodes = container.querySelectorAll('[data-latex]');
    nodes.forEach((node) => {
        renderKaTexElement(node as HTMLElement);
    });
}


export function renderKaTexElement(element: HTMLElement) {
    const latex = element.getAttribute('data-latex');
    const isBlock = element.getAttribute('display-mode') === 'block';
    if (!latex) {
        element.textContent = '';
        return;
    }
    try {
        const htmlLaTex = katex.renderToString(latex, {
            throwOnError: false,
            output: 'html',
            displayMode: isBlock,
        });
        element.innerHTML = htmlLaTex;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (e) {
        element.textContent = latex;
        return;
    }
}