import React, { ReactNode, useRef } from "react";
import { QuestionPageStore } from "./QuestionPageStore";
import { QuestionPageContext } from "./QuestionPageContext";
import { useAdminFormStore } from "../layout/AdminFormContext";

type QuestionPageProviderProps = {
    children: ReactNode;
};

export const QuestionPageProvider: React.FC<QuestionPageProviderProps> = ({ children }) => {
    const adminFormStore = useAdminFormStore();
    const storeRef = useRef<QuestionPageStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new QuestionPageStore({
            parentStore: adminFormStore,
        });
    }

    return (
        <QuestionPageContext.Provider value={storeRef.current!}>
            {children}
        </QuestionPageContext.Provider>
    );
};