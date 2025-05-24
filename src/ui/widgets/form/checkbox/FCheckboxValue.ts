import { observable } from "mobx";

export function FCheckboxValue(initial: boolean) {
    return observable.box<boolean>(initial);
}
