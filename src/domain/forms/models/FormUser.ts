export type FormUserJson = {
    id: number;
    name: string;
};

export class FormUser {
    id: number;
    name: string;

    constructor({ id, name }: { id: number; name: string }) {
        this.id = id;
        this.name = name;
    }

    serialize(): FormUserJson {
        return {
            id: this.id,
            name: this.name,
        };
    }

    static deserialize(json: FormUserJson): FormUser {
        return new FormUser({ id: json.id, name: json.name });
    }
}
