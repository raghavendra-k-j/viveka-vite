import { JsonObj } from "~/core/types/Json";
import { RDQuestion } from "./RDQuestion";

export class RDQuestionsRes {

    questions: RDQuestion[];

    constructor({ questions }: { questions: RDQuestion[] }) {
        this.questions = questions;
    }

    static fromJson(map: JsonObj): RDQuestionsRes {
        const questionsJson = map.questions;
        const questions = questionsJson.map((q: any) => RDQuestion.fromJson(q));
        return new RDQuestionsRes({ questions });
    }

}