export class FormVisibility {
    static readonly Public = new FormVisibility("Public", "Public");
    static readonly Private = new FormVisibility("Private", "Private");

    static readonly values = Object.freeze([FormVisibility.Public, FormVisibility.Private]);

    private constructor(
        public readonly visibility: string,
        public readonly name: string
    ) { }

    get isPublic(): boolean {
        return this === FormVisibility.Public;
    }

    get isPrivate(): boolean {
        return this === FormVisibility.Private;
    }

    static fromVisibility(visibility: string | null | undefined): FormVisibility | null {
        if (!visibility) return null;
        const lowered = visibility.toLowerCase();
        return FormVisibility.values.find(v => v.visibility.toLowerCase() === lowered) || null;
    }
}
