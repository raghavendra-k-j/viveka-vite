import { schema } from "./schema";

export function insertUserCommand(email: string) {
    return (state: any, dispatch: any) => {
        const { from, to } = state.selection;
        const userNode = schema.nodes.user.create({ email });
        if (dispatch) {
            dispatch(state.tr.replaceRangeWith(from, to, userNode));
        }
        return true;
    };
}
