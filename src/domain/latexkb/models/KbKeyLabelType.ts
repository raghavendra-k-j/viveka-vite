export class KbKeyLabelType {
    static readonly LATEX = new KbKeyLabelType('LATEX');
    static readonly TEXT = new KbKeyLabelType('TEXT');
    static readonly values = Object.freeze([KbKeyLabelType.LATEX, KbKeyLabelType.TEXT]);
    private constructor(public readonly type: string) { }

    static fromType(type: string): KbKeyLabelType {
        const match = KbKeyLabelType.values.find(value => value.type === type);
        if (!match) {
            throw new Error(`Invalid KbKeyLabelType: ${type}`);
        }
        return match;
    }
}