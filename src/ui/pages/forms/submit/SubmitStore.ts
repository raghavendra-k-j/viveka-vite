import { makeObservable, observable, runInAction } from "mobx";
import { FormService } from "~/domain/forms/services/FormsService";
import { FormRepo } from "~/infra/repos/FormRepo";
import { ApiClient } from "~/infra/datasources/ApiClient";
import { DataState } from "~/ui/utils/DataState";
import { AppError } from "~/core/error/AppError";
import { CurrentFragment } from "./models/CurrentFragment";
import type { FormDetail } from "~/domain/forms/models/FormDetail";
import type { Language } from "~/domain/forms/models/Language";
import { AppStore } from "../../_layout/AppStore";
import { logger } from "~/core/utils/logger";

export type SubmitStoreProps = {
    permalink: string;
    appStore: AppStore;
};

export class SubmitStore {


    permalink: string;
    currentFragment: CurrentFragment = CurrentFragment.Loading;
    selectedLanguage: Language | null = null;
    formService: FormService;
    formDetailState: DataState<FormDetail> = DataState.init();
    appStore: AppStore;
    startFormImmediatelyAfterLoadForm = false;

    constructor(props: SubmitStoreProps) {
        this.permalink = props.permalink;
        this.formService = new FormService({
            formRepo: new FormRepo({ apiClient: ApiClient.findInstance() }),
        });
        this.appStore = props.appStore;
        this.formDetailState = DataState.init<FormDetail>();
        makeObservable(this, {
            currentFragment: observable,
            selectedLanguage: observable.ref,
            formDetailState: observable.ref,
        });
    }

    async loadFormDetail() {
        try {
            runInAction(() => this.formDetailState = DataState.loading());
            const formDetailRes = (await this.formService.getFormDetail({ permalink: this.permalink })).getOrError();
            this.onFormDetailLoaded(formDetailRes);
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            runInAction(() => this.formDetailState = DataState.error(appError));
        }
    }

    onFormDetailLoaded(formDetail: FormDetail) {
        logger.debug("Start form immediately after load form", this.startFormImmediatelyAfterLoadForm);
        runInAction(() => {
            if (!this.selectedLanguage) {
                this.selectedLanguage = formDetail.language ?? formDetail.languages[0];
            }

            this.formDetailState = DataState.data(formDetail);
            if (formDetail.hasResponse) {
                this.currentFragment = CurrentFragment.AlreadySubmitted;
            }
            else {
                if (this.startFormImmediatelyAfterLoadForm) {
                    this.onClickStart();
                }
                else {
                    this.currentFragment = CurrentFragment.Preview;
                }
            }
        });
    }

    onLanguageSelected(selected: Language) {
        runInAction(() => {
            this.selectedLanguage = selected;
        });
    }

    async onClickStart() {
        if (!this.formDetailState.isLoaded) return;
        this.startFormImmediatelyAfterLoadForm = false;
        runInAction(() => {
            this.currentFragment = this.appStore.hasUser ? CurrentFragment.Interaction : CurrentFragment.Auth;
        });
    }

    get formDetail() {
        if (!this.formDetailState.data) {
            throw new Error("Form detail is not loaded yet");
        }
        return this.formDetailState.data!;
    }


    get hasBackNavigation() {
        return true;
    }

    get returnToHomeURL(): string {
        return this.appStore.appEnv.webBase;
    }

    setCurrentFragmentPreview() {
        runInAction(() => {
            this.currentFragment = CurrentFragment.Preview;
        });
    }


}
