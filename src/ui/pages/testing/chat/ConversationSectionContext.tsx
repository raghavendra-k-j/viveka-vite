import { createContext, useContext } from "react";
import { ConversationSectionStore } from "./ConversationSectionStore";

export const ConversationSectionContext = createContext<ConversationSectionStore | null>(null);

export const useConversationSectionStore = () => {
    const context = useContext(ConversationSectionContext);
    if (!context) throw new Error("useConversationSectionStore must be used within a ConversationSectionProvider");
    return context;
};
