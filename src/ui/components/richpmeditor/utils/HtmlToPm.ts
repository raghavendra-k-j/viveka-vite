import { Node as ProseMirrorNode, Schema } from "prosemirror-model";

type NodeParser = (elem: HTMLElement, schema: Schema) => ProseMirrorNode | null;

export class HtmlToPm {

    private static parsers: Map<string, NodeParser> = new Map([
        ["p", HtmlToPm.parseParagraph],
        ["div", HtmlToPm.parseDiv],
    ]);

    static parse(html: string, schema: Schema): ProseMirrorNode {
        const container = document.createElement("div");
        container.innerHTML = html;
        const nodes: ProseMirrorNode[] = [];

        container.childNodes.forEach(domNode => {
            const pmNode = HtmlToPm.parseNode(domNode, schema);
            if (pmNode) {
                nodes.push(pmNode);
            }
        });

        return schema.nodes.doc.createChecked(null, nodes);
    }

    static parseNode(domNode: ChildNode, schema: Schema): ProseMirrorNode | null {
        if (domNode.nodeType === Node.TEXT_NODE) {
            const text = domNode.textContent?.trim();
            if (text) {
                return schema.nodes.paragraph.createChecked(null, schema.text(text));
            }
            return null;
        }

        if (!(domNode instanceof HTMLElement)) {
            return null;
        }

        const tag = domNode.tagName.toLowerCase();

        const parser = HtmlToPm.parsers.get(tag);
        if (parser) {
            return parser(domNode, schema);
        }

        return null;
    }

    static parseParagraph(pElem: HTMLElement, schema: Schema): ProseMirrorNode | null {
        const inlineNodes: ProseMirrorNode[] = [];

        pElem.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                if (child.textContent?.length) {
                    inlineNodes.push(schema.text(child.textContent));
                }
            } else if (child instanceof HTMLElement) {
                if (child.tagName.toLowerCase() === "span" && child.hasAttribute("data-latex")) {
                    const latex = child.getAttribute("data-latex") || "";
                    inlineNodes.push(schema.nodes.latex.createChecked({ latex }));
                }
            }
        });

        return schema.nodes.paragraph.createChecked(null, inlineNodes);
    }

    static parseDiv(divElem: HTMLElement, schema: Schema): ProseMirrorNode | null {
        if (divElem.hasAttribute("data-latex") && divElem.classList.contains("block-latex")) {
            return HtmlToPm.parseBlockLatex(divElem, schema);
        }

        return null;
    }

    static parseBlockLatex(divElem: HTMLElement, schema: Schema): ProseMirrorNode | null {
        const latex = divElem.getAttribute("data-latex") || "";
        return schema.nodes.blockLatex.createChecked({ latex });
    }
}
