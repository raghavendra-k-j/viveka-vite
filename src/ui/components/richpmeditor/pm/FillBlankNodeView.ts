import { Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { FormQuestionConst } from '~/domain/forms/const/FormQuestionConst';

type FillBlankNodeViewProps = {
    node: ProseMirrorNode;
    view: EditorView;
    getPos: () => number | undefined;
};

export class FillBlankNodeView implements NodeView {

    public dom: HTMLElement;
    private node: ProseMirrorNode;

    constructor(props: FillBlankNodeViewProps) {
        this.node = props.node;
        this.dom = document.createElement('span');
        this.dom.setAttribute('data-tag-fill-blank', '');
        this.dom.textContent = '_'.repeat(FormQuestionConst.FILL_BLANKS_UNDERLINE_LENGTH);
    }

    public update(node: ProseMirrorNode): boolean {
        return node.type === this.node.type;
    }

    public stopEvent(): boolean {
        return false;
    }

    public destroy(): void {

    }

    public ignoreMutation(mutation: MutationRecord | { type: "selection"; target: Node }): boolean {
        if (mutation.type === "selection") {
            return false;
        }
        return true;
    }
}
