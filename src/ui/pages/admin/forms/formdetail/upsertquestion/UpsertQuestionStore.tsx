import { DataState } from "~/ui/utils/DataState";
import { UpsertQuestionVm } from "./models/UpsertQuestionVm"
import { makeObservable, observable, runInAction } from "mobx";

export type UpsertQuestionStoreProps = {
    id?: number;
    formId: number;
}

export class UpsertQuestionStore {

    qvmState: DataState<UpsertQuestionVm> = DataState.init();

    constructor(props: UpsertQuestionStoreProps) {
        makeObservable(this, {
            qvmState: observable.ref,
        });
        if (props.id) {
            this.loadQuestion();
        }
        else {
            this.resetState();
        }
    }

    async loadQuestion() {

    }

    async resetState() {
        const vm = new UpsertQuestionVm();
        runInAction(() => {
            this.qvmState = DataState.data(vm);
        });
    }


}