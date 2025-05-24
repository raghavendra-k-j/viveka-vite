import { AdminFormStore } from "../layout/AdminFormStore";


export type QuestionPageStoreProps = {
    parentStore: AdminFormStore;
}


export class QuestionPageStore {

    parentStore: AdminFormStore;

    constructor(props: QuestionPageStoreProps) {
        this.parentStore = props.parentStore;
    }

}