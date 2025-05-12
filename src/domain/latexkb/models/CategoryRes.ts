import { Category } from "./Category";


type CategoryResProps = {
    categories: Category[];
}

class CategoriesRes {
    categories: Category[];

    constructor(props: CategoryResProps) {
        this.categories = props.categories;
    }
}

export {CategoriesRes};