import { Observer } from "mobx-react-lite";
import { ChatPageProvider } from "./ChatPageProvider";
import { useChatPageStore } from "./ChatPageContext";
import { ConversationSectionView } from "./ConversationSectionView";

export default function ChatPageView() {
    return (
        <ChatPageProvider>
            <MainView />
        </ChatPageProvider>
    );
}

function MainView() {
    const store = useChatPageStore();
    return (
        <div style={{ display: "flex", height: 400 }}>
            <div style={{ width: 200, borderRight: "1px solid #ccc" }}>
                <Observer>
                    {() => (
                        <ul>
                            {store.users.map(u => (
                                <li key={u.id}>
                                    <button onClick={() => store.selectUser(u)}>
                                        {u.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Observer>
            </div>
            <div style={{ flex: 1, padding: 8 }}>
                <Observer>
                    {() => {
                        const selectedUser = store.currentUser;
                        return <ConversationSectionView selectedUser={selectedUser} />;
                    }
                    }
                </Observer>
            </div>
        </div>
    );
}
