import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { schema } from "./schema";
import { userClickPlugin } from "./plugin";

export function createEditor(container: HTMLElement, onUserClick: (email: string, pos: number) => void) {
    const state = EditorState.create({
        schema,
        plugins: [
            keymap({
            }),
            userClickPlugin(onUserClick),
        ],
    });

    return new EditorView(container, {
        state,
    });
}
