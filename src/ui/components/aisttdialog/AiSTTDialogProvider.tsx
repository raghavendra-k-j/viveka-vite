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
    allowAi: boolean;
    enableAi: boolean;
}

export function AiSTTDialogProvider({ children, stt, onDone, onCancel, allowAi, enableAi }: AiSTTDialogProviderProps) {
    const store = useMemo(() => {
        const aiService = new AiSTTServiceOpenAI();
        return new AiSTTDialogStore({ stt, aiService, onDone, onCancel, allowAi, enableAi });
    }, [stt, onDone, onCancel, allowAi, enableAi]);

    return (
        <AiSTTDialogContext.Provider value={store}>
            {children}
        </AiSTTDialogContext.Provider>
    );
}