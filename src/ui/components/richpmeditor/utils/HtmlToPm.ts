import { Node as ProseMirrorNode } from "prosemirror-model";
import { RichPmEditorSchema } from "../pm/schema";

type NodeParser = (elem: HTMLElement, schema: RichPmEditorSchema) => ProseMirrorNode | null;

export class HtmlToPm {

    private static blockParsers: Map<string, NodeParser> = new Map([
        ["p", HtmlToPm.parseParagraph],
        ["div", HtmlToPm.parseDiv],
    ]);

    private static inlineParsers: Map<string, NodeParser> = new Map([
        ["span", HtmlToPm.parseInlineSpan],
    ]);

    static parse(html: string, schema: RichPmEditorSchema): ProseMirrorNode {
        const container = document.createElement("div");
        container.innerHTML = html;
        const nodes: ProseMirrorNode[] = [];

        container.childNodes.forEach((domNode) => {
            const node = HtmlToPm.parseNode(domNode, schema);
            if (node) nodes.push(node);
        });

        return schema.nodes.doc.createChecked(null, nodes);
    }

    static parseNode(domNode: ChildNode, schema: RichPmEditorSchema): ProseMirrorNode | null {
        if (domNode.nodeType === Node.TEXT_NODE) {
            const text = domNode.textContent?.trim();
            return text ? schema.nodes.paragraph.createChecked(null, [schema.text(text)]) : null;
        }

        if (!(domNode instanceof HTMLElement)) return null;

        const tag = domNode.tagName.toLowerCase();

        // Treat <br> as an empty paragraph
        if (tag === "br") {
            return schema.nodes.paragraph.createChecked(); // empty paragraph node
        }

        const parser = HtmlToPm.blockParsers.get(tag);
        return parser ? parser(domNode, schema) : null;
    }

    static parseParagraph(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        const content: ProseMirrorNode[] = [];

        elem.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE && child.textContent?.length) {
                content.push(schema.text(child.textContent));
            } else if (child instanceof HTMLElement) {
                const parser = HtmlToPm.inlineParsers.get(child.tagName.toLowerCase());
                if (parser) {
                    const parsed = parser(child, schema);
                    if (parsed) content.push(parsed);
                }
            }
        });

        return schema.nodes.paragraph.createChecked(null, content);
    }

    static parseDiv(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        const hasLatex = elem.hasAttribute("data-latex");
        const isBlockLatex = hasLatex && elem.classList.contains("block-latex");
        if (isBlockLatex) {
            return HtmlToPm.parseBlockLatex(elem, schema);
        }
        return null;
    }

    static parseInlineSpan(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        if (elem.hasAttribute("data-latex")) {
            const latex = elem.getAttribute("data-latex");
            return latex ? schema.nodes.latex.createChecked({ latex }) : null;
        }

        if (elem.hasAttribute("data-fill-blank")) {
            return schema.nodes.fillBlank.createChecked();
        }

        return null;
    }

    static parseBlockLatex(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        const latex = elem.getAttribute("data-latex");
        return latex ? schema.nodes.blockLatex.createChecked({ latex }) : null;
    }

    static registerBlockParser(tag: string, parser: NodeParser) {
        HtmlToPm.blockParsers.set(tag.toLowerCase(), parser);
    }

    static registerInlineParser(tag: string, parser: NodeParser) {
        HtmlToPm.inlineParsers.set(tag.toLowerCase(), parser);
    }
}
