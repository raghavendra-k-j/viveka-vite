import { Paragraph } from "./Paragraph";
import { TextRunType } from "./TextRunType";

export class Content {

    paragraphs: Paragraph[];

    constructor({ paragraphs = [] }: { paragraphs?: Paragraph[] } = {}) {
        this.paragraphs = paragraphs;
    }

    addParagraph(paragraph: Paragraph): void {
        this.paragraphs.push(paragraph);
    }

    removeParagraph(uuid: string): void {
        this.paragraphs = this.paragraphs.filter(paragraph => paragraph.uuid !== uuid);
    }

    static empty() {
        return new Content();
    }

    clear() {
        this.paragraphs = [];
    }

    get isEmpty(): boolean {
        return this.paragraphs.length === 0;
    }

    get isNotEmpty(): boolean {
        return this.paragraphs.length > 0;
    }

    get length(): number {
        return this.paragraphs.length;
    }

    toMarkdown(): string {
        const allParagraphsMarkdown: string[] = [];
        for (const paragraph of this.paragraphs) {
            const singleParagraphRunsMarkdown: string[] = [];
            for (const run of paragraph.runs) {
                if (run.type === TextRunType.LATEX) {
                    singleParagraphRunsMarkdown.push(`$${run.content}$`);
                } else {
                    singleParagraphRunsMarkdown.push(run.content);
                }
            }
            allParagraphsMarkdown.push(singleParagraphRunsMarkdown.join(""));
        }
        return allParagraphsMarkdown.join("\n\n");
    }

    toPlainText(): string {
        return this.paragraphs
            .map(paragraph => paragraph.runs.map(run => run.content).join(""))
            .join("\n\n");
    }



}