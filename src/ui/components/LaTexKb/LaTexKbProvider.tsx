import React, { useMemo } from "react";
import { LaTexKbStore } from "./LaTextKbStore";
import { LaTexKbService } from "~/domain/latexkb/services/LaTexKbService";
import { LaTexKbContext } from "./LaTexKbContext";
import type { LaTexExpr } from "~/domain/latexkb/models/LaTexExpr";
import { STT } from "~/infra/utils/stt/STT";


export type LaTexKbProps = {
    expr?: LaTexExpr;
    stt: STT;
    onDone: (expr: LaTexExpr) => void;
    onClose: () => void;
};

export function LaTexKbProvider({ children, props }: { children: React.ReactNode, props: LaTexKbProps }) {
    const store = useMemo(() => {
        const latexService = new LaTexKbService();
        return new LaTexKbStore({
            latexKbService: latexService,
            onDone: props.onDone,
            onClose: props.onClose,
            expr: props.expr,
            stt: props.stt,
        });
    }, [props.expr, props.onDone, props.onClose, props.stt]);

    return (
        <LaTexKbContext.Provider value={store}>
            {children}
        </LaTexKbContext.Provider>
    );
}
