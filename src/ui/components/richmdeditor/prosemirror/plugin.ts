import { Plugin } from "prosemirror-state";

export function userClickPlugin(onUserClick: (email: string, pos: number) => void) {
    return new Plugin({
        props: {
            handleClick(view, pos, event) {
                const node = view.state.doc.nodeAt(pos);
                if (node?.type.name === "user") {
                    const email = node.attrs.email;
                    onUserClick(email, pos);
                    return true;
                }
                return false;
            },
        },
    });
}
