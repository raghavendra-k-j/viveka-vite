import { Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { schema } from './schema';
import katex from 'katex';

export class UserMentionNodeView implements NodeView {
    public dom: HTMLElement;
    private node: ProseMirrorNode;
    private view: EditorView;
    private getPos: () => number | undefined;

    constructor(node: ProseMirrorNode, view: EditorView, getPos: () => number | undefined) {
        this.node = node;
        this.view = view;
        this.getPos = getPos;

        this.dom = document.createElement('span');
        this.dom.classList.add('user-mention-nodeview'); // A distinct class for the nodeview's root
        this.renderContent();

        this.dom.addEventListener('click', this.handleClick);
    }

    private renderContent() {
        const katexHtml = katex.renderToString(this.node.attrs.email, {
            throwOnError: false,
            displayMode: false,
            output: 'html',
        });

        // Use attributes from the schema's toDOM for consistency, or define custom view here
        this.dom.setAttribute('data-user-email', this.node.attrs.email);
        this.dom.style.padding = '3px 6px';
        this.dom.style.borderRadius = '4px';
        this.dom.style.backgroundColor = '#e0e0e0';
        this.dom.style.cursor = 'pointer';
        this.dom.style.border = '1px solid #c0c0c0';
        // this.dom.textContent = `📧 ${this.node.attrs.email}`; // Or any display format you prefer
        this.dom.innerHTML = `${katexHtml}`;
        this.dom.title = `Click to edit: ${this.node.attrs.email}`;
    }

    private handleClick = (event: MouseEvent) => {
        event.preventDefault();
        const currentEmail = this.node.attrs.email;
        // You can replace prompt with a custom dialog/modal component
        const newEmail = prompt(`Edit email for ${currentEmail}:`, currentEmail);

        if (newEmail && newEmail !== currentEmail) {
            const pos = this.getPos();
            if (pos === undefined) return;

            const transaction = this.view.state.tr.setNodeMarkup(
                pos,
                null, // Don't change node type
                { ...this.node.attrs, email: newEmail } // Update attributes
            );
            this.view.dispatch(transaction);
        }
    };

    // Called when the node's attributes change.
    update(node: ProseMirrorNode): boolean {
        if (node.type !== schema.nodes.user_mention) {
            return false; // Node type changed, NodeView can't handle it
        }
        // Only re-render if attributes actually changed to avoid unnecessary DOM manipulation
        if (node.attrs.email !== this.node.attrs.email) {
            this.node = node;
            this.renderContent();
        }
        return true;
    }

    // Tell ProseMirror to ignore events from this DOM node's content
    // We are handling the click event.
    stopEvent(event: Event): boolean {
        return event instanceof MouseEvent && event.type === 'click';
    }

    // Optional: Clean up event listeners when the node view is destroyed
    destroy() {
        this.dom.removeEventListener('click', this.handleClick);
    }

    // Optional: If atom:true isn't enough or you have complex inner DOM
    // that ProseMirror shouldn't touch.
    // ignoreMutation(mutation: MutationRecord): boolean {
    //   return true;
    // }
}