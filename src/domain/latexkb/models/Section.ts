import { KeyGroup } from "./KeyGroup";

type SectionProps = {
    id: string;
    name: string;
    items: KeyGroup[];
}

export class Section {
    id: string;
    name: string;
    items: KeyGroup[];

    constructor(props: SectionProps) {
        this.id = props.id;
        this.name = props.name;
        this.items = props.items;
    }

    static fromJson(json: any): Section {
        return new Section({
            id: json.id,
            name: json.name,
            items: json.items.map((item: any) => KeyGroup.fromJson(item)),
        });
    }
}