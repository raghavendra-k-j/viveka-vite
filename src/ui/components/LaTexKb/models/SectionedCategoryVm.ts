import { SectionedCategory } from "~/domain/latexkb/models/Category";
import { CategoryVm } from "./CategoryVm";
import { SectionVm } from "./SectionVm";

type SectionedCategoryProps = CategoryVm & {
    items: SectionVm[];
}

export class SectionedCategoryVm extends CategoryVm {

    id: string;
    name: string;
    items: SectionVm[];

    constructor(props: SectionedCategoryProps) {
        super(props);
        this.id = props.id;
        this.name = props.name;
        this.items = props.items;
    }

    static fromSectionedCategory(category: SectionedCategory): SectionedCategoryVm {
        return new SectionedCategoryVm({
            id: category.id,
            type: category.type,
            name: category.name,
            items: category.items.map(item => SectionVm.fromSection(item)),
        });
    }




}