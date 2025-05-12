import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { useSubmitStore } from "../SubmitContext";
import { InteractionContext } from "./InteractionContext";
import { InteractionStore } from "./InteractionStore";
import { STT } from "~/infra/utils/stt/STT";

type InteractionProviderProps = {
    children: ReactNode;
};

export function InteractionProvider({ children }: InteractionProviderProps) {
    const parentStore = useSubmitStore();
    const sttRef = useRef<STT | null>(null);

    const store = useMemo<InteractionStore>(() => {
        const store = new InteractionStore({ parentStore });
        return store;
    }, [parentStore]);

    useEffect(() => {
        if (!sttRef.current) {
            sttRef.current = new STT();
            store.stt = sttRef.current;
        }
        return () => {
            if (sttRef.current) {
                sttRef.current.dispose();
                sttRef.current = null;
            }
        }
    });

    return (
        <InteractionContext.Provider value={store}>
            {children}
        </InteractionContext.Provider>
    );
}
