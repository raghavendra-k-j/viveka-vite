import { ReactNode, useEffect, useRef } from "react";
import { RichMdEditorStore } from "./RichMdEditorStore";
import { RichMdEditorContext } from "./RichMdEditorContext";
import { createEditor } from "./prosemirror/createEditor";
import { EditorView } from "prosemirror-view";

type RichMdEditorProviderProps = {
    children: ReactNode;
};

export function RichMdEditorProvider({ children }: RichMdEditorProviderProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView>(null);
    const store = useRef<RichMdEditorStore>(new RichMdEditorStore({
        editorRef: editorRef,
        viewRef: viewRef,
    })).current;

    useEffect(() => {
        if (!editorRef.current) return;
        viewRef.current = createEditor(editorRef.current, (email, pos) => {
            const newEmail = prompt("Edit user email:", email);
            if (newEmail && viewRef.current) {
                const tr = viewRef.current.state.tr.setNodeMarkup(pos, undefined, { email: newEmail });
                viewRef.current.dispatch(tr);
            }
        });
        return () => {
            viewRef.current?.destroy();
        };
    }, []);


    return (
        <RichMdEditorContext.Provider value={store}>
            {children}
        </RichMdEditorContext.Provider>
    );
}