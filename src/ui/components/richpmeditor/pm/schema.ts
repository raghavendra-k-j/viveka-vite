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
        latex: {
            group: "inline",
            inline: true,
            atom: true,
            attrs: {
                latex: {
                    default: ""
                }
            },
            toDOM(node) {
                return [
                    "span", {
                        "data-latex": node.attrs.latex,
                    },
                    node.attrs.latex
                ];
            },
            parseDOM: [{
                tag: "span[data-latex]",
                getAttrs(dom) {
                    return { latex: (dom as HTMLElement).getAttribute("data-latex") };
                }
            }],
        },
    }
});