import { makeObservable, observable, runInAction } from "mobx";
import { waitForNextFrame } from "~/infra/utils/waitForNextFrame";

export class User {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}



export class ChatPageStore {

    currentUser: User | null = null;
    users: User[] = [];

    constructor() {
        makeObservable(this, {
            users: observable.shallow,
            currentUser: observable.ref,
        });
    }

    loadUsers() {
        const mockUsers: User[] = [
            new User("1", "Alice"),
            new User("2", "Bob"),
            new User("3", "Charlie")
        ];
        runInAction(() => {
            this.users = mockUsers;
        });
    }


    async selectUser(user: User | null) {
        await waitForNextFrame();
        runInAction(() => {
            this.currentUser = user;
        });
    }

}
