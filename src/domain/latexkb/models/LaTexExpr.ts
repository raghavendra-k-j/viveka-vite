type LaTexExprProps = {
    latex: string;
    isInline: boolean;
}

export class LaTexExpr {
    latex: string;
    isInline: boolean;

    constructor(props: LaTexExprProps) {
        this.latex = props.latex;
        this.isInline = props.isInline;
    }
}