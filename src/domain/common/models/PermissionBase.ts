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
}
