export class QMediaType {
    static readonly image = Object.freeze(new QMediaType('IMAGE'));
    static readonly video = Object.freeze(new QMediaType('VIDEO'));

    private constructor(public readonly type: string) { }

    get value(): string {
        return this.type;
    }

    static readonly values: readonly QMediaType[] = Object.freeze([QMediaType.image, QMediaType.video]);

    static readonly map: Map<string, QMediaType> = Object.freeze(new Map([
        [QMediaType.image.value, QMediaType.image],
        [QMediaType.video.value, QMediaType.video],
    ]));

    static fromValue(value: string): QMediaType | undefined {
        return QMediaType.map.get(value);
    }

    get isImage(): boolean {
        return this === QMediaType.image;
    }

    get isVideo(): boolean {
        return this === QMediaType.video;
    }
}
