import type { JsonObj } from "~/core/types/Json";
import { QMediaExt } from "./QMediaExt";
import { QMediaType } from "./QMediaType";

type QMediaProps = {
    id: number;
    type: QMediaType;
    extension: QMediaExt;
    path: string;
    thumbnail?: string;
    caption?: string;
}


export class QMedia {



    public readonly id: number;
    public readonly type: QMediaType;
    public readonly extension: QMediaExt;
    public readonly path: string;
    public readonly thumbnail?: string;
    public readonly caption?: string;


    constructor({ ...props }: QMediaProps) {
        this.id = props.id;
        this.type = props.type;
        this.extension = props.extension;
        this.path = props.path;
        this.thumbnail = props.thumbnail;
        this.caption = props.caption;
    }

    static fromJson(json: JsonObj): QMedia {
        return new QMedia({
            id: json.id,
            type: QMediaType.fromValue(json.type)!,
            extension: QMediaExt.fromValue(json.extension)!,
            path: json.path,
            thumbnail: json.thumbnail,
            caption: json.caption,
        });
    }
}
