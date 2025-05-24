import { createContext, useContext } from "react";
import { QuestionPageStore } from "./QuestionPageStore";

export const QuestionPageContext = createContext<QuestionPageStore | null>(null);

export const useQuestionPageStore = () => {
    const context = useContext(QuestionPageContext);
    if (!context) {
        throw new Error("useQuestionPageStore must be used within a QuestionPageProvider");
    }
    return context;
}