import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const placeholderPluginKey = new PluginKey('placeholder');

export function placeholderPlugin(text: string): Plugin {
    return new Plugin({
        key: placeholderPluginKey,
        props: {
            decorations(state) {
                const doc = state.doc;
                if (
                    doc.childCount === 1 &&
                    doc.firstChild?.isTextblock &&
                    doc.firstChild.content.size === 0
                ) {
                    const placeholder = document.createElement('div');
                    placeholder.classList.add('richPmPlaceholder');
                    placeholder.textContent = text;
                    return DecorationSet.create(doc, [
                        Decoration.widget(1, placeholder, {
                            side: -1,
                        }),
                    ]);
                }
                return DecorationSet.empty;
            },
        },
    });
}