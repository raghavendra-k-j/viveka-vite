import { allKeyGroups } from "~/domain/latexkb/services/CategoryFactory";
import { KeyGroupsView } from "./KeyGroupsView";
import { KeyGroupVm } from "../models/KeyGroupVm";


function AllCategoryView() {
    return (<KeyGroupsView items={allKeyGroups.map((e) => KeyGroupVm.fromKeyGroup(e))} />);
}

export { AllCategoryView };


