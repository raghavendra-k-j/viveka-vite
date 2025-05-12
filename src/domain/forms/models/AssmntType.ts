export class AssmntType {
    static readonly PreTraining = new AssmntType({ type: "Pre-Training", name: "Pre-Training" });
    static readonly PostTraining = new AssmntType({ type: "Post-Training", name: "Post-Training" });

    readonly type: string;
    readonly name: string;

    private constructor({ type, name }: { type: string; name: string }) {
        this.type = type;
        this.name = name;
    }

    static get values(): AssmntType[] {
        return [AssmntType.PreTraining, AssmntType.PostTraining];
    }

    static fromType(type: string | null): AssmntType | null {
        if (!type) return null;
        return AssmntType.values.find(
            (assmntType) => assmntType.type.toLowerCase() === type.toLowerCase()
        ) || null;
    }
}