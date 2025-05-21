import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';

export class PmToMd {

    static getContent(doc: ProseMirrorNode, schema: Schema): string {
        let markdown = '';
        function serializeNode(node: ProseMirrorNode) {
            if (node.isText) {
                markdown += node.text || '';
            } else if (node.type === schema.nodes.paragraph) {
                node.forEach(serializeNode);
                markdown += '\n\n';
            } else if (node.type === schema.nodes.latex) {
                if (node.attrs && typeof node.attrs.latex === 'string') {
                    markdown += `$${node.attrs.latex}$`;
                }
            } else if (node.type === schema.nodes.doc) {
                node.forEach(serializeNode);
            }
        }

        if (doc) {
            serializeNode(doc);
        }

        return markdown.trim();
    }


}