import type { DirectCategoryVm } from "../models/DirectCategoryVm";
import { KeyGroupsView } from "./KeyGroupsView";

type DirectCategoryProps = {
    category: DirectCategoryVm;
}

function DirectCategoryView(props: DirectCategoryProps) {
    return (<KeyGroupsView items={props.category.items} />);
}

export { DirectCategoryView };


