export class FormType {
    static readonly Assessment = new FormType("Assessment", "Assessment", "Assessments", "ASSMNT");
    static readonly Survey = new FormType("Survey", "Survey", "Surveys", "Survey");

    static readonly values = Object.freeze([FormType.Assessment, FormType.Survey]);

    private constructor(
        public readonly type: string,
        public readonly name: string,
        public readonly namePlural: string,
        public readonly shortName: string
    ) { }

    get isAssessment(): boolean {
        return this === FormType.Assessment;
    }

    get isSurvey(): boolean {
        return this === FormType.Survey;
    }

    static fromType(type: string | null | undefined): FormType | null {
        if (!type) return null;
        const lowered = type.toLowerCase();
        return FormType.values.find(ft => ft.type.toLowerCase() === lowered) || null;
    }
}
