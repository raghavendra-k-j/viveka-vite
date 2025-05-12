import { JsonObj } from "../../../core/types/Json";
import { KeyGroup } from "./KeyGroup";
import { Section } from "./Section";


export enum CategoryType {
    DIRECT = "direct",
    SECTIONED = "sectioned",
}

type CategoryProps = {
    id: string;
    name: string;
}

export abstract class Category {
    id: string;
    type: CategoryType;
    name: string;

    protected constructor(props: CategoryProps, type: CategoryType) {
        this.id = props.id;
        this.name = props.name;
        this.type = type;
    }

    get isSectioned(): boolean {
        return this.type === CategoryType.SECTIONED;
    }

    get isDirect(): boolean {
        return this.type === CategoryType.DIRECT;
    }

    get asSectioned(): SectionedCategory {
        if (this instanceof SectionedCategory) {
            return this;
        }
        throw new Error("Category is not a SectionedCategory");
    }

    get asDirect(): DirectCategory {
        if (this instanceof DirectCategory) {
            return this;
        }
        throw new Error("Category is not a DirectCategory");
    }

}


type DirectCategoryProps = CategoryProps & {
    items: KeyGroup[];
}

export class DirectCategory extends Category {
    items: KeyGroup[];

    constructor(props: DirectCategoryProps) {
        super(props, CategoryType.DIRECT);
        this.items = props.items;
    }

    static fromJson(json: any): DirectCategory {
        return new DirectCategory({
            id: json.id,
            name: json.name,
            items: json.items.map((item: any) => KeyGroup.fromJson(item)),
        });
    }
}

type SectionedCategoryProps = CategoryProps & {
    items: Section[];
}

export class SectionedCategory extends Category {
    items: Section[];

    constructor(props: SectionedCategoryProps) {
        super(props, CategoryType.SECTIONED);
        this.items = props.items;
    }

    static fromJson(json: JsonObj): SectionedCategory {
        return new SectionedCategory({
            id: json.id,
            name: json.name,
            items: json.items.map((item: any) => Section.fromJson(item)),
        });
    }
}