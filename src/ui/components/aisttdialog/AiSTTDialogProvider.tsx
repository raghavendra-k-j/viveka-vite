import { ReactNode, useEffect, useRef } from "react";
import { STT } from "~/infra/utils/stt/STT"
import { AiSTTDialogContext } from "./AiSTTDialogContext";
import { AiSTTDialogStore, ContentTypeOptions } from "./AiSTTDialogStore";
import { AiSTTService } from "~/domain/aistt/services/AiSTTService";
import { AiSTTContent, AiSTTContentType } from "~/domain/aistt/models/AiSTTContent";


export type AiSTTDialogProviderProps = {
    contentType: AiSTTContentType;
    contentTypeProps: ContentTypeOptions,
    children: ReactNode;
    stt: STT;
    onDone: (content: AiSTTContent) => void;
    onCancel: () => void;
}


export function AiSTTDialogProvider(props: AiSTTDialogProviderProps) {
    const aiSttServiceRef = useRef<AiSTTService | null>(null);
    if (!aiSttServiceRef.current) {
        aiSttServiceRef.current = new AiSTTService();
    }
    const aiSttStoreRef = useRef<AiSTTDialogStore | null>(null);
    if (!aiSttStoreRef.current) {
        aiSttStoreRef.current = new AiSTTDialogStore({
            contentType: props.contentType,
            contentTypeProps: props.contentTypeProps,
            stt: props.stt,
            aiService: aiSttServiceRef.current,
            onDone: props.onDone,
            onCancel: props.onCancel,
        });
    }
    const store = aiSttStoreRef.current;

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
            {props.children}
        </AiSTTDialogContext.Provider>
    );
}
