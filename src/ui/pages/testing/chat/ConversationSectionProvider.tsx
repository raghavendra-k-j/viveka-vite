import { ReactNode, useRef } from "react";
import { ConversationSectionStore } from "./ConversationSectionStore";
import { ConversationSectionContext } from "./ConversationSectionContext";
import { User } from "./ChatPageStore";


export function ConversationSectionProvider({ children, selectedUser }: { children: ReactNode, selectedUser: User | null }) {
    const storeRef = useRef<ConversationSectionStore | null>(null);
    if (!storeRef.current || storeRef.current?.user !== selectedUser) {
        storeRef.current = new ConversationSectionStore(selectedUser);
    }
    return (
        <ConversationSectionContext.Provider value={storeRef.current}>
            {children}
        </ConversationSectionContext.Provider>
    );
}
