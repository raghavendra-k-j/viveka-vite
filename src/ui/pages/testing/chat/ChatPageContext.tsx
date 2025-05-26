import { createContext, useContext } from "react";
import { ChatPageStore } from "./ChatPageStore";

export const ChatPageContext = createContext<ChatPageStore | null>(null);

export const useChatPageStore = () => {
    const context = useContext(ChatPageContext);
    if (!context) throw new Error("useChatPageStore must be used within a ChatPageProvider");
    return context;
};
