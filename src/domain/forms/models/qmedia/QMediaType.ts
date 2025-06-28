import { QMediaExtension } from "./QMediaExtension";

export class QMediaType {


    static readonly typeImage = 'IMAGE';
    static readonly typeVideo = 'VIDEO';

    type: string;

    constructor(type: string) {
        this.type = type;
    }

    static image = new QMediaType(QMediaType.typeImage);
    static video = new QMediaType(QMediaType.typeVideo);

    static map: { [key: string]: QMediaType } = {
        [QMediaType.typeImage]: QMediaType.image,
        [QMediaType.typeVideo]: QMediaType.video,
    };

    get isImage(): boolean {
        return this.type === QMediaType.typeImage;
    }

    get isVideo(): boolean {
        return this.type === QMediaType.typeVideo;
    }

    static fromTypeString(type: string): QMediaType | null {
        return QMediaType.map[type];
    }

    static fromExtension(extension: string): QMediaType | null {
        if (extension === QMediaExtension.extensionPng ||
            extension === QMediaExtension.extensionJpg ||
            extension === QMediaExtension.extensionJpeg) {
            return QMediaType.image;
        } else if (extension === QMediaExtension.extensionMp4) {
            return QMediaType.video;
        }
        return null;
    }


}