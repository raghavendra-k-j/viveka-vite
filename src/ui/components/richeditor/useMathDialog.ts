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
                    let content = '';
                    if (expr.isInline) {
                        console.log('rendering inline latex', expr.latex);
                        content = `<span data-tag-ilatex="${expr.latex}">${expr.latex}</span>`;
                    }
                    else {
                        console.log('rendering block latex', expr.latex);
                        content = `<div data-tag-blatex="${expr.latex}">${expr.latex}</div>`;
                    }
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
    const nodes = container.querySelectorAll('[data-tag-ilatex], [data-tag-blatex]');
    if (nodes.length === 0) {
        return;
    }
    nodes.forEach((node) => {
        renderKaTexElement(node as HTMLElement);
    });
}


export function renderKaTexElement(element: HTMLElement) {
    let isInline = true;
    let latex = element.getAttribute('data-tag-ilatex');
    if (!latex) {
        latex = element.getAttribute('data-tag-blatex');
        isInline = false;
    }
    if (!latex) {
        element.textContent = '';
        return;
    }
    try {
        const htmlLaTex = katex.renderToString(latex, {
            throwOnError: false,
            output: 'html',
            displayMode: !isInline,
        });
        element.innerHTML = htmlLaTex;
    }
    catch (e) {
        element.textContent = latex;
        return;
    }
}