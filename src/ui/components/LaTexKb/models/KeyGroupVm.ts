import { KbKeyVm } from "./KbKeyVm";
import type { KeyGroup } from "~/domain/latexkb/models/KeyGroup";


type KeyGroupVmProps = {
    id: string;
    name: string;
    items: KbKeyVm[];
}

class KeyGroupVm {
    id: string;
    name: string;
    items: KbKeyVm[];

    constructor(props: KeyGroupVmProps) {
        this.id = props.id;
        this.name = props.name;
        this.items = props.items;
    }

    static fromKeyGroup(keyGroup: KeyGroup): KeyGroupVm {
        return new KeyGroupVm({
            id: keyGroup.id,
            name: keyGroup.name,
            items: keyGroup.items.map((item) => KbKeyVm.fromKbKey(item)),
        });
    }
}

export { KeyGroupVm };