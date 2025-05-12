import { makeObservable, observable, runInAction } from "mobx";
import { FormService } from "~/domain/forms/services/FormsService";
import { FormRepo } from "~/infra/repos/FormRepo";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { DataState } from "~/ui/utils/DataState";
import { AppError } from "~/core/error/AppError";
import { CurrentFragment } from "./models/CurrentFragment";
import type { FormDetail } from "~/domain/forms/models/FormDetail";
import type { Language } from "~/domain/forms/models/Language";

export type SubmitStoreProps = {
    permalink: string;
};

export class SubmitStore {
    currentFragment: CurrentFragment = CurrentFragment.Loading;
    selectedLanguage: Language | null = null;
    formService: FormService;
    formDetailState: DataState<FormDetail>;

    constructor(props: SubmitStoreProps) {
        this.formService = new FormService({
            formRepo: new FormRepo({ apiClient: ApiClient.findInstance() }),
        });
        this.formDetailState = DataState.init<FormDetail>();
        makeObservable(this, {
            currentFragment: observable,
            selectedLanguage: observable.ref,
            formDetailState: observable.ref,
        });
        this.loadFormDetail(props.permalink);
    }

    async loadFormDetail(permalink: string) {
        try {
            runInAction(() => {
                this.formDetailState = DataState.loading<FormDetail>();
            });
            const formDetailRes = await this.formService.getFormDetail({ permalink });
            this.onFormDetailLoaded(formDetailRes.data);
        } catch (error) {
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.formDetailState = DataState.error(appError);
            });
        }
    }

    onFormDetailLoaded(formDetail: FormDetail) {
        this.currentFragment = formDetail.hasResponse
            ? CurrentFragment.AlreadySubmitted
            : CurrentFragment.Preview;
        this.selectedLanguage = formDetail.language ?? formDetail.languages[0];
        runInAction(() => {
            this.formDetailState = DataState.data(formDetail);
        });
    }

    onLanguageSelected(selected: Language) {
        this.selectedLanguage = selected;
    }

    async onClickStart() {
        runInAction(() => {
            this.currentFragment = CurrentFragment.Interaction;
        });
    }

    get formDetail() {
        if (!this.formDetailState.data) {
            throw new Error("Form detail is not loaded yet");
        }
        return this.formDetailState.data!;
    }
}
