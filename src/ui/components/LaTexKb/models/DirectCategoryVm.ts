import { CategoryVm, type CategoryVmProps } from "./CategoryVm";
import { KeyGroupVm } from "./KeyGroupVm";
import type { DirectCategory } from "~/domain/latexkb/models/Category";

type DirectCategoryVmProps = CategoryVmProps & {
    items: KeyGroupVm[];
}

export class DirectCategoryVm extends CategoryVm {
    items: KeyGroupVm[];

    constructor(props: DirectCategoryVmProps) {
        super(props);
        this.items = props.items;
    }

    static fromDirectCategory(category: DirectCategory): DirectCategoryVm {
        return new DirectCategoryVm({
            id: category.id,
            type: category.type,
            name: category.name,
            items: category.items.map((item) => KeyGroupVm.fromKeyGroup(item)),
        });
    }
}
