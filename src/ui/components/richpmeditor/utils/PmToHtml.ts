import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';

export interface NodeSerializer {
    serialize(node: ProseMirrorNode, schema: Schema): Node | null;
}

class ParagraphSerializer implements NodeSerializer {

    serialize(node: ProseMirrorNode, schema: Schema): Node | null {
        if (this.isEmptyParagraph(node)) {
            // Empty paragraph -> render as line break <br/>
            return document.createElement('br');
        }
        const p = document.createElement('p');
        node.forEach(child => {
            const childNode = this.serializeChildNode(child, schema);
            if (childNode) {
                p.appendChild(childNode);
            }
        });
        return p;
    }

    private isEmptyParagraph(node: ProseMirrorNode): boolean {
        if (node.childCount === 0) return true;

        let nonEmpty = false;
        node.forEach(child => {
            if (child.isText && child.text && child.text.trim().length > 0) {
                nonEmpty = true;
            } else if (!child.isText) {
                nonEmpty = true;
            }
        });
        return !nonEmpty;
    }

    private serializeChildNode(child: ProseMirrorNode, schema: Schema): Node | null {
        if (child.isText) {
            return document.createTextNode(child.text || '');
        }

        if (child.type === schema.nodes.latex && typeof child.attrs?.latex === 'string') {
            return this.serializeLatexNode(child);
        }

        if (child.type === schema.nodes.fillBlank) {
            return this.serializeFillBlankNode();
        }

        // fallback for unknown node types - output text node if text is present
        return document.createTextNode(child.text || '');
    }

    private serializeLatexNode(child: ProseMirrorNode): Element {
        const span = document.createElement('span');
        span.setAttribute('data-tag-ilatex', child.attrs.latex);
        return span;
    }

    private serializeFillBlankNode(): Element {
        const span = document.createElement('span');
        span.setAttribute('data-tag-fill-blank', '');
        return span;
    }
}

class BlockLatexSerializer implements NodeSerializer {
    serialize(node: ProseMirrorNode): Node | null {
        if (typeof node.attrs?.latex === 'string') {
            const div = document.createElement('div');
            div.setAttribute('data-tag-blatex', node.attrs.latex);
            return div;
        }
        return null;
    }
}

export class PmToHtml {

    private static serializers = new Map<string, NodeSerializer>([
        ['paragraph', new ParagraphSerializer()],
        ['blockLatex', new BlockLatexSerializer()],
    ]);

    static convert(doc: ProseMirrorNode, schema: Schema): string {
        const fragment = document.createDocumentFragment();
        console.log(JSON.stringify(doc.toJSON()));

        doc.content.forEach(node => {
            const serializedNode = this.serializeNode(node, schema);
            if (serializedNode) {
                fragment.appendChild(serializedNode);
            }
        });

        // Use a temporary container to get clean HTML string
        const temp = document.createElement('div');
        temp.appendChild(fragment.cloneNode(true));
        let html = temp.innerHTML;

        html = this.trimLineBreaks(html);

        if (this.isOnlyLineBreaks(html)) {
            return '';
        }
        console.log('HTML output:', html);

        return html.trim();
    }

    static serializeNode(node: ProseMirrorNode, schema: Schema): Node | null {
        const serializer = this.serializers.get(node.type.name);
        if (serializer) {
            return serializer.serialize(node, schema);
        }
        return null;
    }

    static registerSerializer(nodeType: string, serializer: NodeSerializer) {
        this.serializers.set(nodeType, serializer);
    }

    private static trimLineBreaks(html: string): string {
        html = html.replace(/^(<br\s*\/?>\s*)+/i, '');
        html = html.replace(/(<br\s*\/?>\s*)+$/i, '');
        return html;
    }

    private static isOnlyLineBreaks(html: string): boolean {
        const cleaned = html.replace(/<br\s*\/?>/gi, '').trim();
        return cleaned.length === 0;
    }
}
