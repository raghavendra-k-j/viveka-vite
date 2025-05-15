import { JsonObj } from "~/core/types/Json";
import { Answer } from "./answer/Answer";

export class SubmitFormQuestion {
    id: number;
    userAnswer?: Answer;
    subQuestions?: SubmitFormQuestion[];
    constructor(id: number, userAnswer?: Answer, subQuestions?: SubmitFormQuestion[]) {
        this.id = id;
        this.userAnswer = userAnswer;
        this.subQuestions = subQuestions;
    }

    toJson(): JsonObj {
        const data: JsonObj = {
            id: this.id,
            userAnswer: this.userAnswer?.toJson(),
        };
        if (this.subQuestions && this.subQuestions.length > 0) {
            data.subQuestions = this.subQuestions.map(subQuestion => subQuestion.toJson());
        }
        return data;
    }
}