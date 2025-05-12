import { KbKeyLabelType } from "./KbKeyLabelType";

type KbKeyProps = {
    id: string;
    name: string;
    latex: string;
    label?: string;
    labelType?: KbKeyLabelType;
}

export class KbKey {
    id: string;
    name: string;
    latex: string;
    label: string;
    labelType: KbKeyLabelType;

    constructor(props: KbKeyProps) {
        this.id = props.id;
        this.name = props.name;
        this.latex = props.latex;
        this.labelType = props.labelType ?? KbKeyLabelType.LATEX;
        this.label = props.label ?? props.latex;
    }


    static fromJson(json: any): KbKey {
        return new KbKey({
            id: json.id,
            name: json.name,
            latex: json.latex,
            label: json.label,
            labelType: KbKeyLabelType.fromType(json.labelType),
        });
    }
}
