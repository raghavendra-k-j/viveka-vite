import { Question } from "./question/Question";

type QuestionsResProps = {
  title: string;
  description?: string;
  questions: Question[];
}

export class QuestionRes {
  title: string;
  description?: string;
  questions: Question[];

  constructor({ ...props }: QuestionsResProps) {
    this.title = props.title;
    this.description = props.description;
    this.questions = props.questions;
  }

  static deserialize(data: any): QuestionRes {
    return new QuestionRes({
      title: data.title,
      description: data.description,
      questions: data.questions.map((q: any) => Question.fromJson(q)),
    });
  }

}