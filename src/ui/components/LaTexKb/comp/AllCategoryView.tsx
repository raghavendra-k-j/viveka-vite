import { allKeyGroups } from "~/domain/latexkb/services/CategoryFactory";
import { AllCategoryVm } from "../models/AllCategoryVm";
import { KeyGroupsView } from "./KeyGroupsView";
import { KeyGroupVm } from "../models/KeyGroupVm";

type AllCategoryViewProps = {
    category: AllCategoryVm;
}

function AllCategoryView(props: AllCategoryViewProps) {
    return (<KeyGroupsView items={allKeyGroups.map((e) => KeyGroupVm.fromKeyGroup(e))} />);
}

export { AllCategoryView };


