type QuestionLevelProps = {
    level: string;
    name: string;
};

export class QuestionLevel {
    readonly level: string;
    readonly name: string;

    private constructor({ level, name }: QuestionLevelProps) {
        this.level = level;
        this.name = name;
    }

    static readonly easy = Object.freeze(new QuestionLevel({ level: "EASY", name: "Easy" }));
    static readonly medium = Object.freeze(new QuestionLevel({ level: "MEDIUM", name: "Medium" }));
    static readonly difficult = Object.freeze(new QuestionLevel({ level: "DIFFICULT", name: "Difficult" }));

    static readonly values: readonly QuestionLevel[] = Object.freeze([
        QuestionLevel.easy,
        QuestionLevel.medium,
        QuestionLevel.difficult,
    ]);

    static readonly valuesMap: Readonly<Record<string, QuestionLevel>> = Object.freeze({
        [QuestionLevel.easy.level]: QuestionLevel.easy,
        [QuestionLevel.medium.level]: QuestionLevel.medium,
        [QuestionLevel.difficult.level]: QuestionLevel.difficult,
    });

    static fromLevel(level: string | null | undefined): QuestionLevel | undefined {
        if (!level) return undefined;
        return QuestionLevel.valuesMap[level] || null;
    }
}
