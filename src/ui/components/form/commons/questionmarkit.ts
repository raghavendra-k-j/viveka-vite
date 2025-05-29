import katex from "katex";

export class MdQRenderer {

    /**
    * Replace <span data-latex="..."></span> with inline-rendered LaTeX using KaTeX.
    * This keeps the LaTeX inline within surrounding text.
    */
    static renderInline(text: string): string {
        return text.replace(/<span[^>]*data-latex="([^"]+)"[^>]*><\/span>/g, (_, latex) => {
            return katex.renderToString(latex, {
                throwOnError: false,
                output: 'html',
                displayMode: false
            });
        });
    }

    /**
     * Replace <span data-latex="..."></span> or <div data-latex="..."></div>
     * with block-rendered LaTeX using KaTeX.
     */
    static renderBlock(text: string): string {
        return text.replace(/<(span|div)[^>]*data-latex="([^"]+)"[^>]*><\/\1>/g, (_, tag, latex) => {
            return katex.renderToString(latex, {
                throwOnError: false,
                output: 'html',
                displayMode: tag === 'div'
            });
        });
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