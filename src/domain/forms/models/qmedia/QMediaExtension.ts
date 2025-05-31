export class QMediaExtension {

    static readonly extensionPng = 'png';
    static readonly extensionJpg = 'jpg';
    static readonly extensionJpeg = 'jpeg';
    static readonly extensionMp4 = 'mp4';

    extension: string;

    constructor(extension: string) {
        this.extension = extension;
    }

    static png = new QMediaExtension(QMediaExtension.extensionPng);
    static jpg = new QMediaExtension(QMediaExtension.extensionJpg);
    static jpeg = new QMediaExtension(QMediaExtension.extensionJpeg);
    static mp4 = new QMediaExtension(QMediaExtension.extensionMp4);

    static extensionsMap: { [key: string]: QMediaExtension } = {
        [QMediaExtension.extensionPng]: QMediaExtension.png,
        [QMediaExtension.extensionJpg]: QMediaExtension.jpg,
        [QMediaExtension.extensionJpeg]: QMediaExtension.jpeg,
        [QMediaExtension.extensionMp4]: QMediaExtension.mp4,
    };

    static fromExtensionString(extension: string): QMediaExtension | null {
        return QMediaExtension.extensionsMap[extension] || null;
    }

}