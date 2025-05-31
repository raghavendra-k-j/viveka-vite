import { Fragment, Node as ProseMirrorNode } from 'prosemirror-model';
import { AiSTTParaListContent, TextRun, TextRunType } from '~/domain/aistt/models/AiSTTContent';
import { RichPmEditorSchema } from '../pm/schema';

type RunConverter = (run: TextRun, schema: RichPmEditorSchema) => ProseMirrorNode;

export class AiSTTParaListContentToPm {

    private static runHandlers: Record<TextRunType, RunConverter> = {
        [TextRunType.TEXT]: (run, schema) => schema.text(run.content),
        [TextRunType.LATEX]: (run, schema) => schema.nodes.latex.create({ latex: run.content }),
    };

    private static convertRun(run: TextRun, schema: RichPmEditorSchema): ProseMirrorNode {
        const handler = this.runHandlers[run.type];
        if (!handler) throw new Error(`Unsupported run type: ${run.type}`);
        return handler(run, schema);
    }

    private static convertParagraphRuns(runs: TextRun[], schema: RichPmEditorSchema): ProseMirrorNode[] {
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

    static convert(content: AiSTTParaListContent, schema: RichPmEditorSchema): Fragment {
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
