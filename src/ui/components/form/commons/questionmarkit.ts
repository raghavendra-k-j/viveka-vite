import MarkdownIt from "markdown-it";
import markItBlanks from "~/ui/utils/forms/markItBlanks";
import markItLaTex from "~/ui/utils/forms/markItLaTex";


export const questionMarkIt = new MarkdownIt({
    breaks: true,
})
    .use(markItLaTex)
    .use(markItBlanks);

export class MdQRenderer {

    static renderInline(text: string): string {
        return questionMarkIt.renderInline(text);
    }

    static question(question: string): string {
        return questionMarkIt.renderInline(question);
    }

    static explanation(explanation: string): string {
        return questionMarkIt.renderInline(explanation);
    }

    static hint(hint: string): string {
        return questionMarkIt.renderInline(hint);
    }

    static textAnswer(answer: string): string {
        return questionMarkIt.renderInline(answer);
    }

    static choiceText(choice: string): string {
        return questionMarkIt.render(choice);
    }

    static pairMatchText(text: string): string {
        return questionMarkIt.renderInline(text);
    }

    static fillBlanksText(text: string): string {
        return questionMarkIt.renderInline(text);
    }

}