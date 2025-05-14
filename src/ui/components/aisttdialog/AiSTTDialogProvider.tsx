import { ReactNode, useMemo } from "react";
import { STT } from "~/infra/utils/stt/STT"
import { AiSTTDialogContext } from "./AiSTTDialogContext";
import { AiSTTDialogStore } from "./AiSTTDialogStore";
import { AiSTTServiceOpenAI } from "~/domain/aistt/services/AiOpenAiSTTService";
import { Content } from "~/domain/aistt/models/Content";

export type AiSTTDialogProviderProps = {
    children: ReactNode;
    stt: STT;
    onDone: (content: Content) => void;
    onCancel: () => void;
}

export function AiSTTDialogProvider({ children, stt, onDone, onCancel }: AiSTTDialogProviderProps) {
    const store = useMemo(() => {
        const aiService = new AiSTTServiceOpenAI();
        return new AiSTTDialogStore({ stt, aiService, onDone, onCancel });
    }, [stt, onDone, onCancel]);

    return (
        <AiSTTDialogContext.Provider value={store}>
            {children}
        </AiSTTDialogContext.Provider>
    );
}