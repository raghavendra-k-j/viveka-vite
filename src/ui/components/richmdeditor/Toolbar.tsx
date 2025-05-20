import { useRichMdEditorStore } from "./RichMdEditorContext";
import { insertUserCommand } from "./prosemirror/commands";

export function Toolbar() {
    const store = useRichMdEditorStore();

    const handleAddUser = () => {
        const email = prompt("Enter user email:");
        if (email && store.view) {
            insertUserCommand(email)(store.view.state, store.view.dispatch);
            store.view.focus();
        }
    };

    return (
        <div className="mb-2">
            <button
                type="button"
                className="px-3 py-1 rounded border border-gray-400 bg-white hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onMouseDown={(e) => {
                    e.preventDefault();
                    handleAddUser();
                }}
            >
                Add User
            </button>
        </div>
    );
}
