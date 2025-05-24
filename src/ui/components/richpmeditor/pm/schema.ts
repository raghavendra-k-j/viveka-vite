import { Schema, NodeSpec } from "prosemirror-model";

export type RichPmEditorSchema = typeof blockSchema | typeof inlineSchema;

const paragraph: NodeSpec = {
    group: "block",
    content: "inline*",
    parseDOM: [{ tag: "p" }],
    toDOM() { return ["p", 0]; }
};

const text: NodeSpec = {
    group: "inline"
};

const inlineLaTex: NodeSpec = {
    group: "inline",
    inline: true,
    atom: true,
    attrs: {
        latex: { default: "" }
    },
    toDOM(node) {
        return [
            "span",
            { "data-latex": node.attrs.latex },
            node.attrs.latex
        ];
    },
    parseDOM: [{
        tag: "span[data-latex]",
        getAttrs(dom) {
            return {
                latex: (dom as HTMLElement).getAttribute("data-latex")
            };
        }
    }]
};


const blockLaTex: NodeSpec = {
    group: "block",
    atom: true,
    attrs: {
        latex: { default: "" }
    },
    toDOM(node) {
        return [
            "div",
            { "data-latex": node.attrs.latex, class: "block-latex" },
            node.attrs.latex
        ];
    },
    parseDOM: [{
        tag: "div[data-latex]",
        getAttrs(dom) {
            return {
                latex: (dom as HTMLElement).getAttribute("data-latex")
            };
        }
    }]
};

export const blockSchema = new Schema({
    nodes: {
        doc: {
            content: "block+"
        },
        paragraph,
        text,
        latex: inlineLaTex,
        blockLatex: blockLaTex
    }
});

export const inlineSchema = new Schema({
    nodes: {
        doc: {
            content: "paragraph"
        },
        paragraph,
        text,
        latex: inlineLaTex
    }
});
