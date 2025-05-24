import { Fragment, Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { Content } from '~/domain/aistt/models/Content';
import { TextRunType } from '~/domain/aistt/models/TextRunType';

type Run = { type: TextRunType; content: string };

type RunConverter = (run: Run, schema: Schema) => ProseMirrorNode;

export class ContentToPm {

    private static runHandlers: Record<TextRunType, RunConverter> = {
        [TextRunType.TEXT]: (run, schema) => schema.text(run.content),
        [TextRunType.LATEX]: (run, schema) => schema.nodes.latex.create({ latex: run.content }),
    };

    private static convertRun(run: Run, schema: Schema): ProseMirrorNode {
        const handler = this.runHandlers[run.type];
        if (!handler) throw new Error(`Unsupported run type: ${run.type}`);
        return handler(run, schema);
    }

    private static convertParagraphRuns(runs: Run[], schema: Schema): ProseMirrorNode[] {
        const nodes: ProseMirrorNode[] = [];

        runs.forEach((run, index) => {
            nodes.push(this.convertRun(run, schema));

            const isNotLast = index < runs.length - 1;
            if (isNotLast) {
                nodes.push(schema.text(' '));
            }
        });

        return nodes;
    }

    static convert(content: Content, schema: Schema): Fragment {
        const { paragraphs } = content;

        if (paragraphs.length === 1) {
            const [paragraph] = paragraphs;
            const inlineNodes = this.convertParagraphRuns(paragraph.runs, schema);
            return Fragment.fromArray(inlineNodes);
        }

        const blockNodes = paragraphs.map(paragraph => {
            const runNodes = this.convertParagraphRuns(paragraph.runs, schema);
            return schema.nodes.paragraph.create(null, Fragment.fromArray(runNodes));
        });

        return Fragment.fromArray(blockNodes);
    }
}
