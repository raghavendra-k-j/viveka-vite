import { FormService } from "~/domain/forms/services/FormsService";
import { ResponseDialogViewer } from "./models/ResponseViewViewer";
import { action, makeObservable, observable, runInAction } from "mobx";
import { DataState } from "~/ui/utils/DataState";
import { RDQuestionsReq, RDQuestionsReqFilter } from "~/domain/forms/models/RDQuestionsReq";
import { withMinDelay } from "~/infra/utils/withMinDelay";
import { ApiError } from "~/infra/errors/ApiError";
import { logger } from "~/core/utils/logger";
import { AppError } from "~/core/error/AppError";
import { RDFormDetailVm } from "./models/ResponseDetailVm";
import { RDQuestionsResVm } from "./models/RDQuestionsResVm";
import { FormDetail } from "~/domain/forms/models/FormDetail";
import { FormDetailExtras } from "~/domain/forms/models/FormDetailExtras";
import { RDQuestionVm } from "./models/QuestionVm";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { ObjQuestionView } from "./comp/questionview/ObjQuestionView";
import { TextQuestionView } from "./comp/questionview/TextQuestionView";
import { FillBlanksQuestionView } from "./comp/questionview/FillBlankQuestionView";
import { PairMatchQuestionView } from "./comp/questionview/PairMatchQuestionView";
import { createDebounce } from "~/core/utils/debouce";

type RendererFunction = (questionVm: RDQuestionVm) => React.ReactElement;

export type ResponseViewStoreProps = {
    formId: number;
    responseUid: string;
    viewer: ResponseDialogViewer;
    formService: FormService;
    onClose: () => void;
}

export class ResponseViewStore {

    formId: number;
    responseUid: string;
    viewer: ResponseDialogViewer;
    formService: FormService;
    detailsState = DataState.init<RDFormDetailVm>();
    questionState = DataState.init<RDQuestionsResVm>();
    questionFilter = RDQuestionsReqFilter.ALL;
    searchQuery = "";
    renderers: Record<string, RendererFunction> = {};
    onClose: () => void;

    get formDetail(): FormDetail {
        return this.detailsState.data!.formDetail;
    }

    get totalQuestions(): number {
        return this.formDetail.totalQuestions;
    }

    get formType() {
        return this.formDetail.type;
    }

    get formDetailExtras(): FormDetailExtras {
        return this.detailsState.data!.formDetailExtras;
    }

    get questions(): RDQuestionVm[] {
        return this.questionState.data!.questions;
    }

    get showUserDetail(): boolean {
        if (this.viewer === ResponseDialogViewer.admin) {
            return true;
        }
        return false;
    }

    constructor({ formId, responseUid, viewer, formService, onClose }: ResponseViewStoreProps) {
        this.formId = formId;
        this.responseUid = responseUid;
        this.viewer = viewer;
        this.formService = formService;
        this.onClose = onClose;
        this.initRenderers();
        makeObservable(this, {
            questionFilter: observable,
            questionState: observable.ref,
            searchQuery: observable,
            detailsState: observable.ref,
            onSearchQueryChanged: action,
        });
    }

    initRenderers() {
        this.renderers[QuestionType.multipleChoice.type] = (questionVm) => <ObjQuestionView question={questionVm} />;
        this.renderers[QuestionType.checkboxes.type] = (questionVm) => <ObjQuestionView question={questionVm} />;
        this.renderers[QuestionType.trueFalse.type] = (questionVm) => <ObjQuestionView question={questionVm} />;
        this.renderers[QuestionType.textbox.type] = (questionVm) => <TextQuestionView question={questionVm} />;
        this.renderers[QuestionType.textarea.type] = (questionVm) => <TextQuestionView question={questionVm} />;
        this.renderers[QuestionType.fillBlanks.type] = (questionVm) => <FillBlanksQuestionView question={questionVm} />;
        this.renderers[QuestionType.pairMatch.type] = (questionVm) => <PairMatchQuestionView question={questionVm} />;
    }


    async loadQuestions() {
        if (this.questionState.isLoading) return;
        runInAction(() => {
            this.questionState = DataState.loading();
        });
        try {
            const req = new RDQuestionsReq({
                formId: this.formId,
                responseUid: this.responseUid,
                filter: this.questionFilter,
                searchQuery: this.searchQuery,
            });
            const res = (await withMinDelay(this.formService.getFormResponseDetailQuestions(req))).getOrError();
            runInAction(() => {
                this.questionState = DataState.data(RDQuestionsResVm.fromModel(res, this));
            });
        } catch (error) {
            const apiError = ApiError.fromAny(error);
            logger.error("Error in loadQuestions:", { error: apiError, formId: this.formId, responseUid: this.responseUid });
            runInAction(() => {
                this.questionState = DataState.error(apiError);
            });
        }
    }

    onSearchQueryChanged(value: string): void {
        if (this.searchQuery === value) return;
        this.searchQuery = value;
        this.debouncedSearch();
    }

    debouncedSearch = createDebounce(() => this.loadQuestions(), 500);



    async loadDetails() {
        if (this.detailsState.isLoading) return;
        try {
            runInAction(() => {
                this.detailsState = DataState.loading();
            });
            const res = (await withMinDelay(this.formService.getFormResponseDetail({
                formId: this.formId,
                responseUid: this.responseUid
            }))).getOrError();
            runInAction(() => {
                this.detailsState = DataState.data(RDFormDetailVm.fromModel(res));
            });
            this.loadQuestions();
        }
        catch (error) {
            const apiError = AppError.fromAny(error);
            logger.error("Error in loadDetails:", error);
            runInAction(() => {
                this.detailsState = DataState.error(apiError);
            });
        }
    }

    async applyQuestionsFilter(filter: RDQuestionsReqFilter) {
        runInAction(() => {
            this.questionFilter = filter;
        });
        this.loadQuestions();
    }


}