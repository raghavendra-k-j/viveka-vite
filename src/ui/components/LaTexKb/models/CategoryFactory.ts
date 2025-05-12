import { Category } from "~/domain/latexkb/models/Category";
import { DirectCategoryVm } from "./DirectCategoryVm";
import { SectionedCategoryVm } from "./SectionedCategoryVm";
import { CategoryVm } from "./CategoryVm";

export function createCategoryVm(category: Category): CategoryVm {
    if (category.isSectioned) {
        return SectionedCategoryVm.fromSectionedCategory(category.asSectioned);
    } else if (category.isDirect) {
        return DirectCategoryVm.fromDirectCategory(category.asDirect);
    }
    throw new Error("Unknown category type: " + category.type);
}
