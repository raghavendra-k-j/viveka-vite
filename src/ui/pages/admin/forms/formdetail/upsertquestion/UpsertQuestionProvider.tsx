import { ReactNode, useRef } from "react";
import { UpsertQuestionStore } from "./UpsertQuestionStore";
import { UpsertQuestionContext } from "./UpsertQuestionContext";
import { QuestionPageStore } from "../questions/QuestionPageStore";
import { STT } from "~/infra/utils/stt/STT";

interface UpsertQuestionProviderProps {
    parentStore: QuestionPageStore;
    children: ReactNode;
    onClose: () => void;
    stt: STT;
}

export const UpsertQuestionProvider: React.FC<UpsertQuestionProviderProps> = (props) => {
    const storeRef = useRef<UpsertQuestionStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = new UpsertQuestionStore({
            parentStore: props.parentStore,
            onClose: props.onClose,
            stt: props.stt,
        });
    }

    return (
        <UpsertQuestionContext.Provider value={storeRef.current!}>
            {props.children}
        </UpsertQuestionContext.Provider>
    );
};
