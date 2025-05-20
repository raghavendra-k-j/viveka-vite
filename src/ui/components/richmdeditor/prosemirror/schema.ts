import { Schema } from "prosemirror-model";

export const schema = new Schema({
    nodes: {
        doc: { content: "paragraph+" },
        paragraph: {
            group: "block",
            content: "inline*",
            parseDOM: [{ tag: "p" }],
            toDOM() {
                return ["p", 0];
            },
        },
        text: { group: "inline" },
        user: {
            inline: true,
            group: "inline",
            atom: true,
            attrs: { email: {} },
            selectable: true,
            parseDOM: [
                {
                    tag: "span[data-user-email]",
                    getAttrs(dom) {
                        return { email: (dom as HTMLElement).getAttribute("data-user-email") };
                    },
                },
            ],
            toDOM(node) {
                return [
                    "span",
                    {
                        "data-user-email": node.attrs.email,
                        style: "background: #def; padding: 2px 4px; border-radius: 3px; cursor: pointer;",
                    },
                    node.attrs.email,
                ];
            },
        },
    },
    marks: {
        // existing marks (e.g. bold)
    },
});
