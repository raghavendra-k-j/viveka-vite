import { JsonObj } from "~/core/types/Json";
import { AssmntType } from "../../models/AssmntType";


export type AssmntTypeRefItemProps = {
    id: number;
    title: string;
    assessmentType?: AssmntType;
}

export class AssmntTypeRefItem {

    public readonly id: number;
    public readonly title: string;
    public readonly assessmentType?: AssmntType;

    constructor(props: AssmntTypeRefItemProps) {
        this.id = props.id;
        this.title = props.title;
        this.assessmentType = props.assessmentType;
    }

    static fromJson(json: JsonObj): AssmntTypeRefItem {
        const id = json.id;
        const title = json.title;
        const assessmentType = AssmntType.fromType(json.assessmentType);
        return new AssmntTypeRefItem({
            id,
            title,
            assessmentType,
        });
    }

}