import { JsonObj } from "~/core/types/Json";
import { QMediaExtension } from "./QMediaExtension";
import { QMediaType } from "./QMediaType";

export type QMediaTileProps = {
    id: number;
    type: QMediaType;
    extension: QMediaExtension;
    path: string;
    thumbnail: string | null;
    caption: string | null;
}

export class QMediaTile {
    id: number;
    type: QMediaType;
    extension: QMediaExtension;
    path: string;
    thumbnail: string | null;
    caption: string | null;

    constructor(props: QMediaTileProps) {
        this.id = props.id;
        this.type = props.type;
        this.extension = props.extension;
        this.path = props.path;
        this.thumbnail = props.thumbnail;
        this.caption = props.caption;
    }

    static fromMap(map: JsonObj): QMediaTile {
        return new QMediaTile({
            id: map.id,
            type: QMediaType.fromTypeString(map.type)!,
            extension: QMediaExtension.fromExtensionString(map.extension)!,
            path: map.path,
            thumbnail: map.thumbnail,
            caption: map.caption
        });
    }
}
