import { JsonObj } from "~/core/types/Json";
import { QMediaExtension } from "./QMediaExtension";
import { QMediaType } from "./QMediaType";
import { QMediaTile } from "./QMediaTile";

export type QMediaProps = {
    id: number;
    createdAt: Date;
    name: string;
    path: string;
    thumbnail: string | null;
    type: QMediaType;
    extension: QMediaExtension;
    size: number;
}

export class QMedia {

    id: number;
    createdAt: Date;
    name: string;
    path: string;
    thumbnail: string | null;
    type: QMediaType;
    extension: QMediaExtension;
    size: number;

    constructor(props: QMediaProps) {
        this.id = props.id;
        this.createdAt = props.createdAt;
        this.name = props.name;
        this.path = props.path;
        this.thumbnail = props.thumbnail;
        this.type = props.type;
        this.extension = props.extension;
        this.size = props.size;
    }


    toTile(): QMediaTile {
        return new QMediaTile({
            id: this.id,
            type: this.type,
            extension: this.extension,
            path: this.path,
            thumbnail: this.thumbnail,
            caption: null,
        });
    }


    static fromJson(map: JsonObj): QMedia {
        return new QMedia({
            id: map.id,
            createdAt: new Date(map.createdAt),
            name: map.name,
            path: map.path,
            thumbnail: map.thumbnail || null,
            type: QMediaType.fromTypeString(map.type)!,
            extension: QMediaExtension.fromExtensionString(map.extension)!,
            size: map.size,
        });
    }
}