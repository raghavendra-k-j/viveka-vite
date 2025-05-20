import { Fragment, Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { Content } from '~/domain/aistt/models/Content';
import { TextRunType } from '~/domain/aistt/models/TextRunType';

export class ContentToPm {

    static convert(content: Content, schema: Schema): Fragment {
        const pmParagraphNodes: ProseMirrorNode[] = [];

        for (const paragraphItem of content.paragraphs) {
            const pmRunNodes: ProseMirrorNode[] = [];
            for (const run of paragraphItem.runs) {
                if (run.type === TextRunType.LATEX) {
                    const userMentionNode = schema.nodes.latex.create({ latex: run.content });
                    pmRunNodes.push(userMentionNode);
                } else {
                    pmRunNodes.push(schema.text(run.content));
                }
                if (run !== paragraphItem.runs[paragraphItem.runs.length - 1]) {
                    pmRunNodes.push(schema.text(" "));
                }
            }
            pmParagraphNodes.push(schema.nodes.paragraph.create(null, Fragment.fromArray(pmRunNodes)));
        }
        
        return Fragment.fromArray(pmParagraphNodes);
    }
}
