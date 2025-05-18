import { JsonObj } from "~/core/types/Json";

type PermissionBaseProps = {
    id: string;
    name: string;
};

export class PermissionBase {
    id: string;
    name: string;

    constructor(props: PermissionBaseProps) {
        this.id = props.id;
        this.name = props.name;
    }

    static fromJson(json: JsonObj): PermissionBase {
        return new PermissionBase({
            id: json.id,
            name: json.name,
        });
    }

}
