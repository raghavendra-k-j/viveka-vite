import { Fragment, Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { Content } from '~/domain/aistt/models/Content';
import { TextRunType } from '~/domain/aistt/models/TextRunType';

export class ContentToPm {

    static convert(content: Content, schema: Schema): Fragment {
        if (content.paragraphs.length === 1) {
            const paragraph = content.paragraphs[0];
            const pmRunNodes: ProseMirrorNode[] = [];

            for (const run of paragraph.runs) {
                if (run.type === TextRunType.LATEX) {
                    pmRunNodes.push(schema.nodes.latex.create({ latex: run.content }));
                } else {
                    pmRunNodes.push(schema.text(run.content));
                }
                // Add space between runs if not the last one
                if (run !== paragraph.runs[paragraph.runs.length - 1]) {
                    pmRunNodes.push(schema.text(" "));
                }
            }

            // Return as inline fragment (NOT wrapped in paragraph)
            return Fragment.fromArray(pmRunNodes);
        }

        // Fallback: multiple paragraphs, wrap in <p>
        const pmParagraphNodes: ProseMirrorNode[] = [];

        for (const paragraphItem of content.paragraphs) {
            const pmRunNodes: ProseMirrorNode[] = [];
            for (const run of paragraphItem.runs) {
                if (run.type === TextRunType.LATEX) {
                    pmRunNodes.push(schema.nodes.latex.create({ latex: run.content }));
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

