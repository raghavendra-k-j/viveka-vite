import { Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { schema } from './schema';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type LaTexNodeViewProps = {
    node: ProseMirrorNode;
    view: EditorView;
    getPos: () => number | undefined;
    onClick: OnClickLaTexNodeView;
}

type OnClickLaTexNodeView = (node: LaTexNodeView) => void;

export class LaTexNodeView implements NodeView {
    public dom: HTMLElement;
    private node: ProseMirrorNode;
    private view: EditorView;
    private getPos: () => number | undefined;
    private onClick: OnClickLaTexNodeView;

    constructor(props: LaTexNodeViewProps) {
        this.node = props.node;
        this.view = props.view;
        this.getPos = props.getPos;
        this.onClick = props.onClick;
        this.dom = document.createElement('span');
        this.dom.classList.add('latex-nodeview');
        this.renderContent();
        this.dom.addEventListener('click', this.handleClick);
    }

    private renderContent(): void {
        const latexSource = this.node.attrs.latex || '';
        try {
            katex.render(latexSource, this.dom, {
                throwOnError: false,
                displayMode: false,
            });
        }
        catch (e) {
            this.dom.textContent = `${latexSource}`;
            console.error("Katex rendering error:", e);
        }
        this.dom.setAttribute('data-latex', latexSource);
        this.dom.title = `Click to Edit`;
    }

    private handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        const pos = this.getPos();
        if (pos === undefined) return;
        this.onClick(this);
    };

    public update(node: ProseMirrorNode): boolean {
        if (node.type !== schema.nodes.latex) {
            return false;
        }
        if (node.attrs.latex !== this.node.attrs.latex) {
            this.node = node;
            this.renderContent();
        }
        return true;
    }

    public stopEvent(event: Event): boolean {
        return event instanceof MouseEvent && event.target === this.dom && !!this.onClick;
    }

    public destroy(): void {
        this.dom.removeEventListener('click', this.handleClick);
    }


    public ignoreMutation(mutation: globalThis.MutationRecord | { type: "selection"; target: Node }): boolean {
        if (mutation.type === "selection") {
            return false;
        }
        if (this.node.type.spec.atom) {
            const domMutation = mutation as globalThis.MutationRecord;
            if (this.dom.contains(domMutation.target)) {
                return true;
            }
        }
        return false;
    }
}