import { makeObservable, observable, action } from "mobx";
import { type DialogEntry } from "./DialogEntry";

export class DialogManagerStore {
    dialogs: DialogEntry[] = [];

    constructor() {
        makeObservable(this, {
            dialogs: observable,
            show: action,
            pop: action,
            closeById: action,
            closeByIds: action,
            closeAll: action,
        });
    }

    private findById(id: string): number | undefined {
        const index = this.dialogs.findIndex((dialog) => dialog.id === id);
        return index !== -1 ? index : undefined;
    }

    private findByIds(ids: string[]): number[] {
        return ids
            .map((id) => this.dialogs.findIndex((d) => d.id === id))
            .filter((index) => index !== -1);
    }

    show<T>(dialog: DialogEntry<T>) {
        this.dialogs.push(dialog);
    }

    pop() {
        this.dialogs.pop();
    }

    closeById(id: string) {
        const index = this.findById(id);
        if (index === undefined) return;
        this.dialogs.splice(index, 1);
    }

    closeByIds(ids: string[]) {
        const indexes = this.findByIds(ids);
        indexes.sort((a, b) => b - a).forEach((index) => {
            this.dialogs.splice(index, 1);
        });
    }

    closeAll() {
        this.dialogs = [];
    }
}
