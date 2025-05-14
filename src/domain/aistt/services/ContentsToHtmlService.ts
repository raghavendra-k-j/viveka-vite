import katex from "katex";
import { Content } from "../models/Content";
import { Paragraph } from "../models/Paragraph";
import { TextRun } from "../models/TextRun";
import { TextRunType } from "../models/TextRunType";

export class ContentsToHtmlService {


    public static toHtml(contents: Content): string {
        return contents.paragraphs
            .map(paragraph => this.convertParagraph(paragraph))
            .join("\n");
    }

    public static convertParagraph(paragraph: Paragraph): string {
        const htmlRuns = paragraph.runs
            .map(run => this.convertRun(run))
            .join(" ");
        return `<p>${htmlRuns}</p>`;
    }


    public static convertRun(run: TextRun): string {
        if (run.type === TextRunType.LATEX) {
            const katexHtml = katex.renderToString(
                run.content,
                {
                    throwOnError: false,
                    output: "html",
                    displayMode: false,
                }
            );
            return `<span>${katexHtml}</span>`;
        } else {
            return this.escapeHtml(run.content);
        }
    }

    public static escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
