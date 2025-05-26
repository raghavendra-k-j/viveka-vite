import { AdminFormStore } from "../layout/AdminFormStore";


export type QuestionPageStoreProps = {
    parentStore: AdminFormStore;
}


export class QuestionPageStore {

    parentStore: AdminFormStore;

    get fd() {
        return this.parentStore.fd;
    }

    constructor(props: QuestionPageStoreProps) {
        this.parentStore = props.parentStore;
    }

}