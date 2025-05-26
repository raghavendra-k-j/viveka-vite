import { User } from "./ChatPageStore";
import { useConversationSectionStore } from "./ConversationSectionContext";
import { ConversationSectionProvider } from "./ConversationSectionProvider";

export function ConversationSectionView({ selectedUser }: { selectedUser: User | null }) {
    return (<ConversationSectionProvider selectedUser={selectedUser}>
        <Body />
    </ConversationSectionProvider>);
}

function Body() {
    const store = useConversationSectionStore();
    return (
        <div>
            Hello, {store.user ? store.user.name : "Guest"}!
        </div>
    );
}
