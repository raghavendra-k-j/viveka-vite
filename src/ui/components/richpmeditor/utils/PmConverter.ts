import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { PmToHtml } from './PmToHtml';
import { HtmlToPm } from './HtmlToPm';
import { RichPmEditorRef } from '../RichPmEditor';
import { RichPmEditorSchema } from '../pm/schema';


export class PmConverter {

    static toNodeOrEmpty({ text, schema }: { text: string | null; schema: Schema }): ProseMirrorNode | null {
        if (!text || text.trim() === "") {
            return null;
        }
        return this.toNode({ text, schema });
    }

    static toText({ doc, schema }: { doc: ProseMirrorNode; schema: Schema }): string | null {
        const string = PmToHtml.convert(doc, schema);
        return string.trim() === "" ? null : string;
    }

    static toNode({ text, schema }: { text: string; schema: Schema }): ProseMirrorNode | null {
        return HtmlToPm.parse(text, schema);
    }

    static toTextFromRef(props: { ref: React.RefObject<RichPmEditorRef | null>, schema: RichPmEditorSchema }): string | null {
        const editor = props.ref.current;
        if (!editor) return null;

        const content = editor.getContent();
        if (!content) return null;

        return PmConverter.toText({ doc: content, schema: props.schema });
    }

    static toTextFromRefOrEmpty(props: { ref: React.RefObject<RichPmEditorRef | null>, schema: RichPmEditorSchema }): string {
        const text = PmConverter.toTextFromRef(props);
        return text ? text : "";
    }


}
