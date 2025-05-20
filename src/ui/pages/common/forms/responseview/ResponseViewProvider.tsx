import React, { useMemo } from "react";
import { ResponseViewContext } from "./ResponseViewContext";
import { ResponseViewStore } from "./ResponseViewStore";
import type { ResponseDialogViewer } from "./models/ResponseViewViewer";
import { FormService } from "~/domain/forms/services/FormsService";

export type ResponseViewProviderProps = {
    formId: number;
    responseUid: string;
    viewer: ResponseDialogViewer;
    children: React.ReactNode;
    formService: FormService;
    onClose: () => void;
};

export function ResponseViewProvider(props: ResponseViewProviderProps) {
    const store = useMemo(() => new ResponseViewStore({
        formId: props.formId,
        responseUid: props.responseUid,
        viewer: props.viewer,
        formService: props.formService,
        onClose: props.onClose,
    }), [props.formId, props.responseUid, props.viewer, props.formService, props.onClose]);

    return (
        <ResponseViewContext.Provider value={store}>
            {props.children}
        </ResponseViewContext.Provider>
    );
}