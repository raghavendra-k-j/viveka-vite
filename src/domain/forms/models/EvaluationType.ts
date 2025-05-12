export class EvaluationType {
    static readonly auto = new EvaluationType('auto', 'Auto Evaluation', 'Auto Evaluated');
    static readonly manual = new EvaluationType('manual', 'Manual Evaluation', 'Manually Evaluated');
    static readonly aiAuto = new EvaluationType('ai_auto', 'AI Evaluation', 'AI Evaluated');

    static readonly values = Object.freeze([EvaluationType.auto, EvaluationType.manual, EvaluationType.aiAuto]);

    type: string;
    name: string;
    doneName: string;

    private constructor(type: string, name: string, doneName: string) {
        this.type = type;
        this.name = name;
        this.doneName = doneName;
    }

    static fromType(type: string | null| undefined): EvaluationType | null {
        if (!type) return null;
        return EvaluationType.values.find(v => v.type === type) ?? null;
    }
}

