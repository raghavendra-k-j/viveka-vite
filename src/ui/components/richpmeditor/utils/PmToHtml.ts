import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';

export interface NodeSerializer {
    serialize(node: ProseMirrorNode, schema: Schema): string;
}

class ParagraphSerializer implements NodeSerializer {
    serialize(node: ProseMirrorNode, schema: Schema): string {
        if (this.isEmptyParagraph(node)) {
            // Empty paragraph -> render as line break
            return '<br/>';
        }
        let html = '<p>';
        node.forEach(child => {
            html += this.serializeChildNode(child, schema);
        });
        html += '</p>';
        return html;
    }

    private isEmptyParagraph(node: ProseMirrorNode): boolean {
        // Paragraph is empty if it has no text or inline content
        // (children all empty or zero length text)
        if (node.childCount === 0) return true;

        let nonEmpty = false;
        node.forEach(child => {
            if (child.isText && child.text && child.text.trim().length > 0) {
                nonEmpty = true;
            } else if (!child.isText) {
                // Non-text inline node (latex, fill blank, etc) counts as non-empty
                nonEmpty = true;
            }
        });
        return !nonEmpty;
    }

    private serializeChildNode(child: ProseMirrorNode, schema: Schema): string {
        if (child.isText) {
            return this.serializeTextNode(child);
        }

        if (child.type === schema.nodes.latex && typeof child.attrs?.latex === 'string') {
            return this.serializeLatexNode(child);
        }

        if (child.type === schema.nodes.fillBlank) {
            return this.serializeFillBlankNode();
        }

        // fallback for unknown node types - output text if present
        return child.text || '';
    }

    private serializeTextNode(child: ProseMirrorNode): string {
        return child.text || '';
    }

    private serializeLatexNode(child: ProseMirrorNode): string {
        return `<span data-latex="${child.attrs.latex}"></span>`;
    }

    private serializeFillBlankNode(): string {
        return `<span data-fill-blank></span>`;
    }
}

class BlockLatexSerializer implements NodeSerializer {
    serialize(node: ProseMirrorNode): string {
        if (typeof node.attrs?.latex === 'string') {
            return `<div data-latex="${node.attrs.latex}" class="block-latex"></div>`;
        }
        return '';
    }
}

export class PmToHtml {
    private static serializers = new Map<string, NodeSerializer>([
        ['paragraph', new ParagraphSerializer()],
        ['blockLatex', new BlockLatexSerializer()],
    ]);

    static convert(doc: ProseMirrorNode, schema: Schema): string {
        const htmlParts: string[] = [];

        doc.content.forEach(node => {
            const serialized = this.serializeNode(node, schema);
            if (serialized) {
                htmlParts.push(serialized);
            }
        });

        // Join parts with new lines
        let html = htmlParts.join('\n');

        // Trim leading/trailing <br/> tags as line breaks
        html = this.trimLineBreaks(html);

        // If content is only <br/> or empty, return empty string
        if (this.isOnlyLineBreaks(html)) {
            return '';
        }

        return html.trim();
    }

    static serializeNode(node: ProseMirrorNode, schema: Schema): string {
        const serializer = this.serializers.get(node.type.name);
        if (serializer) {
            return serializer.serialize(node, schema);
        }
        return '';
    }

    static registerSerializer(nodeType: string, serializer: NodeSerializer) {
        this.serializers.set(nodeType, serializer);
    }

    private static trimLineBreaks(html: string): string {
        // Remove all leading <br/> tags
        html = html.replace(/^(<br\s*\/?>\s*)+/i, '');
        // Remove all trailing <br/> tags
        html = html.replace(/(<br\s*\/?>\s*)+$/i, '');
        return html;
    }

    private static isOnlyLineBreaks(html: string): boolean {
        // Check if html is empty or consists only of line breaks (possibly with whitespace)
        const cleaned = html.replace(/<br\s*\/?>/gi, '').trim();
        return cleaned.length === 0;
    }
}
