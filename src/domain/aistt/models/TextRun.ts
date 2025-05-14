import { UUIDUtil } from "~/core/utils/UUIDUtil";
import { TextRunType } from "./TextRunType";

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
