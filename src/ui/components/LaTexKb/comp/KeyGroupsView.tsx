import type { KeyGroupVm } from "../models/KeyGroupVm";
import { KeyGroupView } from "./KeyGroupView";

type KeyGroupsViewProps = {
    items: KeyGroupVm[];
}

function KeyGroupsView(props: KeyGroupsViewProps) {
    return (<div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {props.items.map((e) => (<KeyGroupView key={e.id} item={e} />))}
    </div>);
}

export { KeyGroupsView };


