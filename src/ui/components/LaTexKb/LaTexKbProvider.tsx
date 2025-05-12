import React, { useMemo } from "react";
import { LaTexKbStore } from "./LaTextKbStore";
import { LaTexKbService } from "~/domain/latexkb/services/LaTexKbService";
import { LaTexKbContext } from "./LaTexKbContext";
import type { LaTexExpr } from "~/domain/latexkb/models/LaTexExpr";


export type LaTexKbProps = {
    expr?: LaTexExpr;
    onDone: (expr: LaTexExpr) => void;
};

export function LaTexKbProvider({ children, props }: { children: React.ReactNode, props: LaTexKbProps }) {
    const store = useMemo(() => {
        const latexService = new LaTexKbService(
        );
        return new LaTexKbStore({
            latexKbService: latexService,
            onDone: props.onDone,
            expr: props.expr
        });
    }, [props.expr, props.onDone]);

    return (
        <LaTexKbContext.Provider value={store}>
            {children}
        </LaTexKbContext.Provider>
    );
}
