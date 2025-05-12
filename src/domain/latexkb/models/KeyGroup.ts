import { KbKey } from "./KbKey";

type KeyGroupProps = {
    id: string;
    name: string;
    items: KbKey[];
    
}

export class KeyGroup {
    id: string;
    name: string;
    items: KbKey[];

    constructor(props: KeyGroupProps) {
        this.id = props.id;
        this.name = props.name;
        this.items = props.items;
    }

    static fromJson(json: any): KeyGroup {
        return new KeyGroup({
            id: json.id,
            name: json.name,
            items: json.items.map((item: any) => KbKey.fromJson(item)),
        });
    }

    static empty(props: { id: string; name: string; }) {
        return new KeyGroup({
            id: props.id,
            name: props.name,
            items: [],
        });
    }

}