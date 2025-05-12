import { Section } from "~/domain/latexkb/models/Section";
import { KeyGroupVm } from "./KeyGroupVm";
import { KeyGroup } from "~/domain/latexkb/models/KeyGroup";


type SectionVmProps = {
    id: string;
    name: string;
    items: KeyGroupVm[];
}

class SectionVm {

    id: string;
    name: string;
    items: KeyGroupVm[];

    constructor(props: SectionVmProps) {
        this.id = props.id;
        this.name = props.name;
        this.items = props.items;
    }

    static fromSection(section: Section): SectionVm {
        return new SectionVm({
            id: section.id,
            name: section.name,
            items: section.items.map((item: KeyGroup) => KeyGroupVm.fromKeyGroup(item)),
        });
    }
}

export { SectionVm };