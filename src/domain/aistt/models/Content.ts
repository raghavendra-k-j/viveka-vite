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

}