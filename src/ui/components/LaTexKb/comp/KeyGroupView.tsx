import type { KeyGroupVm } from "../models/KeyGroupVm";
import { KbKeyView } from "./KeyView";

type KeyGroupViewProps = {
    item: KeyGroupVm
}

export function KeyGroupView(props: KeyGroupViewProps) {
    const { item } = props;
    return (
        <div className="flex flex-wrap gap-2 p-2">
            {item.items.map(e => (
                <KbKeyView item={e} key={e.base.id} />
            ))}
        </div>
    );
}