import { JsonObj } from "~/core/types/Json";

export class FormUser {
    id: number;
    name: string;

    constructor({ id, name }: { id: number; name: string }) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json: JsonObj): FormUser {
        return new FormUser({ id: json.id, name: json.name });
    }
}
