export class FormStatus {
    static readonly Draft = new FormStatus("Draft", "Draft");
    static readonly Published = new FormStatus("Published", "Published");
    static readonly Archived = new FormStatus("Archived", "Archived");

    static readonly values = Object.freeze([
        FormStatus.Draft,
        FormStatus.Published,
        FormStatus.Archived
    ]);

    private constructor(
        public readonly status: string,
        public readonly name: string
    ) { }

    get isDraft(): boolean {
        return this === FormStatus.Draft;
    }

    get isPublished(): boolean {
        return this === FormStatus.Published;
    }

    get isArchived(): boolean {
        return this === FormStatus.Archived;
    }

    static fromValue(value: string): FormStatus {
        const status = FormStatus.values.find(s => s.status === value);
        if (!status) {
            throw new Error(`Invalid FormStatus value: ${value}`);
        }
        return status;
    }


}