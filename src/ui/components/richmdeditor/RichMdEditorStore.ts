import { EditorView } from "prosemirror-view";

type RichMdEditorStoreProps = {
    editorRef: React.RefObject<HTMLDivElement | null>;
    viewRef: React.RefObject<EditorView | null>;
}

export class RichMdEditorStore {
    editorRef: React.RefObject<HTMLDivElement | null>;
    viewRef: React.RefObject<EditorView | null>;

    get editor() {
        return this.editorRef.current;
    }

    get view() {
        return this.viewRef.current;
    }

    constructor(props: RichMdEditorStoreProps) {
        this.editorRef = props.editorRef;
        this.viewRef = props.viewRef;
    }
}