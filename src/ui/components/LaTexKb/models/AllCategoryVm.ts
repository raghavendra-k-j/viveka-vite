import { CategoryVm, type CategoryVmProps } from "./CategoryVm";
import { CategoryType } from "~/domain/latexkb/models/Category";

type AllCategoryVmProps = CategoryVmProps & {

}

export class AllCategoryVm extends CategoryVm {

    constructor(props: AllCategoryVmProps) {
        super(props);
    }

    static create() {
        return new AllCategoryVm({
            id: "all",
            type: CategoryType.ALL,
            name: "All",
        });
    }
}
