import { ReactNode, useEffect, useMemo } from "react";
import { STT } from "~/infra/utils/stt/STT"
import { AiSTTDialogContext } from "./AiSTTDialogContext";
import { AiSTTDialogStore } from "./AiSTTDialogStore";
import { AiSTTService } from "~/domain/aistt/services/AiSTTService";
import { Content } from "~/domain/aistt/models/Content";


export type AiSTTDialogProviderProps = {
    children: ReactNode;
    stt: STT;
    onDone: (content: Content) => void;
    onCancel: () => void;
    allowAi: boolean;
    enableAi: boolean;
}


export function AiSTTDialogProvider({ children, stt, onDone, onCancel, allowAi, enableAi }: AiSTTDialogProviderProps) {
    const store = useMemo(() => {
        const aiService = new AiSTTService();
        return new AiSTTDialogStore({ stt, aiService, onDone, onCancel, allowAi, enableAi });
    }, [stt, onDone, onCancel, allowAi, enableAi]);

    useEffect(() => {
        store.addSTTListeners();
        const timer = setTimeout(() => {
            store.onClickMainButton();
        }, 500);

        return () => {
            clearTimeout(timer);
            store.dispose();
        };
    }, [store]);

    return (
        <AiSTTDialogContext.Provider value={store}>
            {children}
        </AiSTTDialogContext.Provider>
    );
}
