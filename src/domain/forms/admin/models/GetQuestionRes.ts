import { JsonObj } from "~/core/types/Json";
import { Question } from "./Question";

export class GetQuestionRes {

    public readonly question: Question;

    constructor(props: { question: Question }) {
        this.question = props.question;
    }

    static fromJson(json: JsonObj): GetQuestionRes {
        return new GetQuestionRes({
            question: Question.fromJson(json.question),
        });
    }

}