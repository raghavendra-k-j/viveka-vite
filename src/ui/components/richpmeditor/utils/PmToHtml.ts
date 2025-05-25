import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';

type NodeSerializer = (node: ProseMirrorNode, schema: Schema) => string;

export class PmToHtml {

    private static serializers: Map<string, NodeSerializer> = new Map([
        ['paragraph', PmToHtml.serializeParagraph],
        ['blockLatex', PmToHtml.serializeBlockLatex],
    ]);

    static convert(doc: ProseMirrorNode, schema: Schema): string {
        let html = '';
        for (const node of doc.children) {
            html += PmToHtml.serializeNode(node, schema);
        }
        return html.trim();
    }

    static serializeNode(node: ProseMirrorNode, schema: Schema): string {
        const serializer = PmToHtml.serializers.get(node.type.name);
        if (serializer) {
            return serializer(node, schema);
        }
        return '';
    }

    static serializeParagraph(node: ProseMirrorNode, schema: Schema): string {
        let html = '<p>';
        node.forEach(child => {
            if (child.isText) {
                html += child.text;
            } else if (child.type === schema.nodes.latex) {
                if (child.attrs && typeof child.attrs.latex === 'string') {
                    html += `<span data-latex="${child.attrs.latex}">${child.attrs.latex}</span>`;
                }
            } else {
                html += child.text || '';
            }
        });
        html += '</p>';
        return html;
    }

    static serializeBlockLatex(node: ProseMirrorNode): string {
        if (node.attrs && typeof node.attrs.latex === 'string') {
            return `<div data-latex="${node.attrs.latex}" class="block-latex">${node.attrs.latex}</div>`;
        }
        return '';
    }
}
