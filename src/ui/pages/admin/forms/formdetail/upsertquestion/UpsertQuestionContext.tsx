import { createContext, useContext } from "react";
import { UpsertQuestionStore } from "./UpsertQuestionStore";

export const UpsertQuestionContext = createContext<UpsertQuestionStore | null>(null);

export const useUpsertQuestionStore = () => {
    const context = useContext(UpsertQuestionContext);
    if (!context) {
        throw new Error("useQuestionPageStore must be used within an UpsertQuestionProvider");
    }
    return context;
}
