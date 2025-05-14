import { UUIDUtil } from "~/core/utils/UUIDUtil";
import { TextRun } from "./TextRun";

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