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

        for (const domNode of Array.from(container.childNodes)) {
            const node = HtmlToPm.parseNode(domNode, schema);
            if (node) nodes.push(node);
        }

        return schema.nodes.doc.createChecked(null, nodes);
    }

    static parseNode(domNode: ChildNode, schema: RichPmEditorSchema): ProseMirrorNode | null {
        if (domNode.nodeType === Node.TEXT_NODE) {
            const text = domNode.textContent?.trim();
            return text ? schema.nodes.paragraph.createChecked(null, [schema.text(text)]) : null;
        }

        if (!(domNode instanceof HTMLElement)) return null;

        const tag = domNode.tagName.toLowerCase();

        if (tag === "br") {
            return schema.nodes.paragraph.createChecked(); // Empty paragraph
        }

        const blockParser = HtmlToPm.blockParsers.get(tag);
        if (blockParser) {
            return blockParser(domNode, schema);
        }

        const inlineParser = HtmlToPm.inlineParsers.get(tag);
        if (inlineParser) {
            return inlineParser(domNode, schema);
        }

        // Fallback: recursively parse children and wrap them in a paragraph
        const children: ProseMirrorNode[] = [];

        for (const child of Array.from(domNode.childNodes)) {
            const childNode = HtmlToPm.parseNode(child, schema);
            if (childNode) children.push(childNode);
        }

        return children.length > 0
            ? schema.nodes.paragraph.createChecked(null, children)
            : null;
    }

    static parseParagraph(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        const content: ProseMirrorNode[] = [];

        for (const child of Array.from(elem.childNodes)) {
            if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
                content.push(schema.text(child.textContent));
            } else if (child instanceof HTMLElement) {
                const inlineParser = HtmlToPm.inlineParsers.get(child.tagName.toLowerCase());
                if (inlineParser) {
                    const parsed = inlineParser(child, schema);
                    if (parsed) content.push(parsed);
                } else {
                    // Fallback: parse recursively
                    const nested = HtmlToPm.parseNode(child, schema);
                    if (nested) content.push(nested);
                }
            }
        }

        return schema.nodes.paragraph.createChecked(null, content);
    }

    static parseDiv(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        if (elem.hasAttribute("data-tag-blatex")) {
            return HtmlToPm.parseBlockLatex(elem, schema);
        }

        // Fallback to parse content recursively if not a known div
        const children: ProseMirrorNode[] = [];

        for (const child of Array.from(elem.childNodes)) {
            const childNode = HtmlToPm.parseNode(child, schema);
            if (childNode) children.push(childNode);
        }

        return children.length > 0
            ? schema.nodes.paragraph.createChecked(null, children)
            : null;
    }

    static parseInlineSpan(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        if (elem.hasAttribute("data-tag-ilatex")) {
            const latex = elem.getAttribute("data-tag-ilatex");
            return latex ? schema.nodes.latex.createChecked({ latex }) : null;
        }

        if (elem.hasAttribute("data-tag-fill-blank")) {
            return schema.nodes.fillBlank.createChecked();
        }

        return null;
    }

    static parseBlockLatex(elem: HTMLElement, schema: RichPmEditorSchema): ProseMirrorNode | null {
        const latex = elem.getAttribute("data-tag-blatex");
        return latex ? schema.nodes.blockLatex.createChecked({ latex }) : null;
    }

    static registerBlockParser(tag: string, parser: NodeParser) {
        HtmlToPm.blockParsers.set(tag.toLowerCase(), parser);
    }

    static registerInlineParser(tag: string, parser: NodeParser) {
        HtmlToPm.inlineParsers.set(tag.toLowerCase(), parser);
    }
}
