import type { CategoryType } from "~/domain/latexkb/models/Category";

export type CategoryVmProps = {
    id: string;
    type: CategoryType;
    name: string;
}

abstract class CategoryVm {
    id: string;
    type: CategoryType;
    name: string;

    constructor(props: CategoryVmProps) {
        this.id = props.id;
        this.type = props.type;
        this.name = props.name;
    }
}

export { CategoryVm };

