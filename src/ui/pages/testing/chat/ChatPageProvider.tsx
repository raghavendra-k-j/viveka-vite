import { ReactNode, useEffect, useRef } from "react";
import { ChatPageStore } from "./ChatPageStore";
import { ChatPageContext } from "./ChatPageContext";

export function ChatPageProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<ChatPageStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new ChatPageStore();
    }
    const store = storeRef.current;
    useEffect(() => {
        store.loadUsers();
    }, [store]);

    return (
        <ChatPageContext.Provider value={storeRef.current}>
            {children}
        </ChatPageContext.Provider>
    );
}
