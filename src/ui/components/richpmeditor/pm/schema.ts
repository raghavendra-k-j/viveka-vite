import { Schema } from "prosemirror-model";

export const schema = new Schema({
    nodes: {
        doc: {
            content: "block+",
        },
        paragraph: {
            group: "block",
            content: "inline*",
            parseDOM: [{ tag: "p" }],
            toDOM() { return ["p", 0]; }
        },
        text: {
            group: "inline"
        },
        user_mention: {
            group: "inline",
            inline: true,
            atom: true,
            attrs: {
                email: { default: "" }
            },
            toDOM(node) {
                return [
                    "span",
                    {
                        "data-user-email": node.attrs.email,
                        style: "padding: 2px 4px; border-radius: 3px; cursor: pointer;"
                    },
                    node.attrs.email
                ];
            },
            parseDOM: [{
                tag: "span[data-user-email]",
                getAttrs(dom) {
                    return { email: (dom as HTMLElement).getAttribute("data-user-email") };
                }
            }],
        },
    },
    marks: {
        strong: {
            parseDOM: [{ tag: "strong" }, { tag: "b" }, { style: "font-weight=bold" }],
            toDOM() { return ["strong", 0]; }
        },
        em: {
            parseDOM: [{ tag: "em" }, { tag: "i" }, { style: "font-style=italic" }],
            toDOM() { return ["em", 0]; }
        },
        underline: {
            parseDOM: [{ tag: "u" }, { style: "text-decoration=underline" }],
            toDOM() { return ["u", 0]; }
        }
    }
});