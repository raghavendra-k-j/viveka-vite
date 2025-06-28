import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { useSubmitStore } from "../SubmitContext";
import { InteractionContext } from "./InteractionContext";
import { InteractionStore } from "./InteractionStore";
import { STT } from "~/infra/utils/stt/STT";
import { useDialogManager } from "~/ui/widgets/dialogmanager";

type InteractionProviderProps = {
    children: ReactNode;
};

export function InteractionProvider({ children }: InteractionProviderProps) {
    const parentStore = useSubmitStore();
    const sttRef = useRef<STT | null>(null);
    const dialogManager = useDialogManager();
    const storeRef = useRef<InteractionStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new InteractionStore({
            parentStore,
            dialogManager,
        });
    }
    const store = storeRef.current;

    useEffect(() => {
        store.loadQuestions();
        if (!sttRef.current) {
            sttRef.current = new STT();
            store.stt = sttRef.current;
        }
        return () => {
            if (sttRef.current) {
                sttRef.current.dispose();
                sttRef.current = null;
                store.dispose();
            }
        }
    });

    return (
        <InteractionContext.Provider value={store}>
            {children}
        </InteractionContext.Provider>
    );
}
