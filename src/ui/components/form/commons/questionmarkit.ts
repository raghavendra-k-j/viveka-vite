import MarkdownIt from "markdown-it";
import markItBlanks from "~/ui/utils/forms/markItBlanks";
import markItLaTex from "~/ui/utils/forms/markItLaTex";

export const questionMarkIt = new MarkdownIt()
    .use(markItLaTex)
    .use(markItBlanks)
    ;