import { UUIDUtil } from "~/core/utils/UUIDUtil";

export enum TextRunType {
    TEXT = "text",
    LATEX = "latex",
}

export class TextRun {
    uuid: string = UUIDUtil.compact;
    type: TextRunType;
    content: string;

    constructor({ type, content }: { type: TextRunType; content: string }) {
        this.type = type;
        this.content = content;
    }

    static fromText(text: string): TextRun {
        return new TextRun({ type: TextRunType.TEXT, content: text });
    }
}

export class Paragraph {
    uuid: string = UUIDUtil.compact;
    runs: TextRun[];

    constructor({ runs = [] }: { runs?: TextRun[] } = {}) {
        this.runs = runs;
    }

    addRun(run: TextRun): void {
        this.runs.push(run);
    }

    removeRun(uuid: string): void {
        this.runs = this.runs.filter(run => run.uuid !== uuid);
    }

    static fromText(text: string): Paragraph {
        const run = TextRun.fromText(text);
        return new Paragraph({ runs: [run], });
    }
}


export enum AiSTTContentType {
    LATEX = "latex",
    PARA_LIST = "para_list",
}

export abstract class AiSTTContent {
    abstract get isEmpty(): boolean;
    get isNotEmpty(): boolean {
        return !this.isEmpty;
    }
    abstract clear(): void;

    get isLatex(): boolean {
        return this instanceof AiSTTLatextContent;
    }

    get isParaList(): boolean {
        return this instanceof AiSTTParaListContent;
    }
}

export class AiSTTLatextContent extends AiSTTContent {

    latex: string;

    constructor(latex: string) {
        super();
        this.latex = latex;
    }

    get isEmpty(): boolean {
        return this.latex.trim() === "";
    }

    clear(): void {
        this.latex = "";
    }

    static newEmpty(): AiSTTLatextContent {
        return new AiSTTLatextContent("");
    }
}

export class AiSTTParaListContent extends AiSTTContent {

    paragraphs: Paragraph[];
    constructor(paragraphs: Paragraph[]) {
        super();
        this.paragraphs = paragraphs;
    }

    get isEmpty(): boolean {
        return this.paragraphs.length === 0 || this.paragraphs.every(p => p.runs.length === 0);
    }

    toMarkdown(): string {
        const strList: string[] = [];
        for (const paragraph of this.paragraphs) {
            const runList: string[] = [];
            for (const run of paragraph.runs) {
                if (run.type === TextRunType.LATEX) {
                    runList.push(`$${run.content}$`);
                } else {
                    runList.push(run.content);
                }
            }
            strList.push(runList.join(""));
        }
        return strList.join("\n\n");
    }

    toPlainText(): string {
        return this.paragraphs
            .map(paragraph => paragraph.runs.map(run => run.content).join(""))
            .join("\n\n");
    }

    clear(): void {
        this.paragraphs = [];
    }

    addParagraph(paragraph: Paragraph): void {
        this.paragraphs.push(paragraph);
    }

    removeParagraph(uuid: string): void {
        this.paragraphs = this.paragraphs.filter(paragraph => paragraph.uuid !== uuid);
    }

    static newEmpty(): AiSTTParaListContent {
        return new AiSTTParaListContent([]);
    }
}