import katex from "katex";
import { FormQuestionConst } from "~/domain/forms/const/FormQuestionConst";
import DOMPurify from 'dompurify';

export class MdQRenderer {

    private static domParser = new DOMParser();


    static renderInline(text: string): string {
        const doc = this.domParser.parseFromString(text, 'text/html');

        // Replace blanks: <span data-tag-fill-blank></span>
        const blanks = doc.querySelectorAll('span[data-tag-fill-blank]');
        blanks.forEach(blank => {
            const underline = FormQuestionConst.FILL_BLANKS_UNDERLINE;
            const textNode = document.createTextNode(underline);
            blank.replaceWith(textNode);
        });

        // Replace inline LaTeX: <span data-tag-ilatex="..."></span>
        const inlineSpans = doc.querySelectorAll('span[data-tag-ilatex]');
        inlineSpans.forEach(span => {
            const latex = span.getAttribute('data-tag-ilatex') || '';
            try {
                const rendered = katex.renderToString(latex, {
                    throwOnError: false,
                    output: 'html',
                    displayMode: false
                });
                const temp = document.createElement('span');
                temp.innerHTML = rendered;
                span.replaceWith(...Array.from(temp.childNodes));
            } catch {
                // If rendering fails, keep original or replace with plain text
            }
        });
        return DOMPurify.sanitize(doc.body.innerHTML);
    }


    static renderBlock(text: string): string {
        // 1. Parse the string into a DOM
        const doc = this.domParser.parseFromString(text, 'text/html');

        // 2. Replace inline LaTeX spans
        const inlineSpans = doc.querySelectorAll('span[data-tag-ilatex]');
        inlineSpans.forEach(span => {
            const latex = span.getAttribute('data-tag-ilatex') || '';
            try {
                const rendered = katex.renderToString(latex, {
                    throwOnError: false,
                    output: 'html',
                    displayMode: false
                });
                // Replace the entire span content with rendered HTML
                // Here we can either replace innerHTML or replace the whole element
                // To avoid nested tags issues, replace the whole span element
                const temp = document.createElement('span');
                temp.innerHTML = rendered;
                span.replaceWith(...Array.from(temp.childNodes));
            } catch {
                // fallback: leave original latex text or do nothing
            }
        });

        // 3. Replace block LaTeX divs
        const blockDivs = doc.querySelectorAll('div[data-tag-blatex]');
        blockDivs.forEach(div => {
            const latex = div.getAttribute('data-tag-blatex') || '';
            try {
                const rendered = katex.renderToString(latex, {
                    throwOnError: false,
                    output: 'html',
                    displayMode: true
                });
                const temp = document.createElement('div');
                temp.innerHTML = rendered;
                div.replaceWith(...Array.from(temp.childNodes));
            } catch {
                // fallback
            }
        });

        // 4. Replace blanks spans/divs with underscore strings or desired content
        const blanks = doc.querySelectorAll('[data-tag-fill-blank]');
        blanks.forEach(blank => {
            const textNode = document.createTextNode(FormQuestionConst.FILL_BLANKS_UNDERLINE);
            blank.replaceWith(textNode);
        });

        // 5. Sanitize and return the HTML
        return DOMPurify.sanitize(doc.body.innerHTML);
    }


    static question(question: string): string {
        return this.renderBlock(question);
    }

    static explanation(explanation: string): string {
        return this.renderBlock(explanation);
    }

    static hint(hint: string): string {
        return this.renderBlock(hint);
    }

    static inlineTextAnswer(answer: string): string {
        return this.renderBlock(answer);
    }

    static blockTextAnswer(answer: string): string {
        return this.renderBlock(answer);
    }

    static choiceText(choice: string): string {
        return this.renderInline(choice);
    }

    static pairMatchText(text: string): string {
        return this.renderInline(text);
    }

    static fillBlanksText(text: string): string {
        return this.renderInline(text);
    }

}