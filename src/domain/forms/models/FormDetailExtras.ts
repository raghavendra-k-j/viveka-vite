import { JsonObj } from "~/core/types/Json";

export class FormDetailExtras {
    public readonly hasGroupQuestions: boolean;
    public readonly totalAnswerableQuestions: number;

    constructor({ hasGroupQuestions, totalAnswerableQuestions }: { hasGroupQuestions: boolean; totalAnswerableQuestions: number }) {
        this.hasGroupQuestions = hasGroupQuestions;
        this.totalAnswerableQuestions = totalAnswerableQuestions;
    }

    public static fromJson(json: JsonObj): FormDetailExtras {
        return new FormDetailExtras({
            hasGroupQuestions: json.hasGroupQuestions,
            totalAnswerableQuestions: json.totalAnswerableQuestions
        });
    }


}