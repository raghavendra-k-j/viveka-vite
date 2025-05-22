import { Question } from "../../models/question/Question";



export type AdminQuestionListResProps = {
    totalMarks?: number;
    allQuestionsRequired: boolean;
    questions: Question[];
}

export class AdminQuestionListRes {
    public readonly totalMarks?: number;
    public readonly allQuestionsRequired: boolean;
    public readonly questions: Question[];

    constructor(props: AdminQuestionListResProps) {
        this.totalMarks = props.totalMarks;
        this.allQuestionsRequired = props.allQuestionsRequired;
        this.questions = props.questions;
    }

    public static fromMap(map: any): AdminQuestionListRes {
        return new AdminQuestionListRes({
            totalMarks: map.totalMarks,
            allQuestionsRequired: map.allQuestionsRequired,
            questions: map.questions.map((e: any) => Question.fromJson(e)),
        });
    }
}