import { User } from "./ChatPageStore";

export class ConversationSectionStore {
    user: User | null;

    constructor(user: User | null) {
        this.user = user;
    }
}
