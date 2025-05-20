import { RDQuestionsRes } from "~/domain/forms/models/RDQuestionsRes";
import { RDQuestionVm } from "./QuestionVm";
import { ResponseViewStore } from "../ResponseViewStore";

export class RDQuestionsResVm {
    public readonly questions: RDQuestionVm[];

    constructor({ questions }: { questions: RDQuestionVm[] }) {
        this.questions = questions;
    }

    static fromModel(model: RDQuestionsRes, storeRef: ResponseViewStore) {
        return new RDQuestionsResVm({
            questions: model.questions.map((question) => new RDQuestionVm({ question: question, storeRef: storeRef}))
        });
    }
}