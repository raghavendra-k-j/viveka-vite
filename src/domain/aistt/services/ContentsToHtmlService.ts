import katex from "katex";
import { AiSTTLatextContent, AiSTTParaListContent, Paragraph, TextRun, TextRunType } from "../models/AiSTTContent";
import DomPurify from "dompurify";

export class ContentsToHtmlService {


    static convertLaTex(content: AiSTTLatextContent): string {
        const katexHtml = katex.renderToString(
            content.latex,
            {
                throwOnError: false,
                output: "html",
                displayMode: false,
            }
        );
        const span = document.createElement("span");
        span.innerHTML = DomPurify.sanitize(katexHtml);
        return span.outerHTML;
    }

    public static toHtml(contents: AiSTTParaListContent): string {
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
        }
        else {
            return run.content;
        }
    }
}
