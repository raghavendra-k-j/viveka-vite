export class QMediaExt {
    static readonly png = Object.freeze(new QMediaExt('PNG'));
    static readonly jpg = Object.freeze(new QMediaExt('JPG'));
    static readonly jpeg = Object.freeze(new QMediaExt('JPEG'));
    static readonly mp4 = Object.freeze(new QMediaExt('MP4'));

    private constructor(public readonly type: string) { }

    get value(): string {
        return this.type;
    }

    static readonly values: readonly QMediaExt[] = Object.freeze([
        QMediaExt.png,
        QMediaExt.jpg,
        QMediaExt.jpeg,
        QMediaExt.mp4,
    ]);

    static readonly map: Map<string, QMediaExt> = Object.freeze(new Map([
        [QMediaExt.png.value, QMediaExt.png],
        [QMediaExt.jpg.value, QMediaExt.jpg],
        [QMediaExt.jpeg.value, QMediaExt.jpeg],
        [QMediaExt.mp4.value, QMediaExt.mp4],
    ]));

    static fromValue(value: string): QMediaExt | undefined {
        return QMediaExt.map.get(value.toUpperCase());
    }

    get isPng(): boolean {
        return this === QMediaExt.png;
    }

    get isJpg(): boolean {
        return this === QMediaExt.jpg;
    }

    get isJpeg(): boolean {
        return this === QMediaExt.jpeg;
    }

    get isMp4(): boolean {
        return this === QMediaExt.mp4;
    }
}
