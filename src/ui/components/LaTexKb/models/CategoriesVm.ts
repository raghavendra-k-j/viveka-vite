import type { CategoriesRes } from "~/domain/latexkb/models/CategoryRes";
import { CategoryVm } from "./CategoryVm";
import { createCategoryVm } from "./CategoryFactory";
import { AllCategoryVm } from "./AllCategoryVm";

type CategoriesVmProps = {
    items: CategoryVm[];
}

class CategoriesVm {

    items: CategoryVm[];

    constructor(props: CategoriesVmProps) {
        this.items = props.items;
    }

    static fromCategoriesRes(categories: CategoriesRes): CategoriesVm {
        const items = categories.categories.map((cat) => createCategoryVm(cat));
        items.unshift(AllCategoryVm.create());
        return new CategoriesVm({
            items: items
        });
    }

    get length(): number {
        return this.items.length;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }

}

export { CategoriesVm };