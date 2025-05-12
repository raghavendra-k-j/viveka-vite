export type FormAccessJson = {
    id: number;
    sharedAt: string | null;
    viewedAt: string | null;
};

export class FormAccess {
    id: number;
    sharedAt: Date | null;
    viewedAt: Date | null;

    constructor({
        id,
        sharedAt,
        viewedAt,
    }: {
        id: number;
        sharedAt: Date | null;
        viewedAt: Date | null;
    }) {
        this.id = id;
        this.sharedAt = sharedAt;
        this.viewedAt = viewedAt;
    }


    serialize(): FormAccessJson {
        return {
            id: this.id,
            sharedAt: this.sharedAt ? this.sharedAt.toISOString() : null,
            viewedAt: this.viewedAt ? this.viewedAt.toISOString() : null,
        };
    }

    static deserialize(json: FormAccessJson): FormAccess {
        return new FormAccess({
            id: json.id,
            sharedAt: json.sharedAt ? new Date(json.sharedAt) : null,
            viewedAt: json.viewedAt ? new Date(json.viewedAt) : null,
        });
    }
}

