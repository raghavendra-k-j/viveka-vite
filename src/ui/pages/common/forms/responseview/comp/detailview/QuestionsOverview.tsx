import { InfoCard, InfoCardHeader, InfoCardItem } from "./InfoCard";
import { useResponseViewStore } from "../../ResponseViewContext";
import { NumFmt } from "~/core/utils/NumFmt";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";

export function QuestionsOverview() {

    const store = useResponseViewStore();
    const formResponse = store.formDetail.formResponse!;

    const hasGroupQuestions = store.formDetailExtras.hasGroupQuestions;


    return (
        <InfoCard>
            <InfoCardHeader title="Questions Overview" />
            {/* Total Questions */}
            {hasGroupQuestions && (
                <div className="bg-blue-50 text-blue-600 px-4 py-2 font-semibold mb-3 text-sm">
                    This count also includes sub-questions in <b>{QuestionType.groupQuestion.getName(store.formDetail.type)}</b> Questions.
                </div>
            )}
            <InfoCardItem
                label="Total Questions"
                value={NumFmt.padZero(store.formDetailExtras.totalAnswerableQuestions)}
            />
            {/* Answered */}
            <InfoCardItem
                label="Answered"
                value={NumFmt.padZero(formResponse.attemptedQCount)}
            />
            {/* Correct */}
            <InfoCardItem
                label="Correct"
                value={NumFmt.padZero(formResponse.correctQCount!)}
            />
            {/* Partially Correct */}
            <InfoCardItem
                label="Partially Correct"
                value={NumFmt.padZero(formResponse.partiallyCorrectQCount!)}
            />
            {/* Incorrect */}
            <InfoCardItem
                label="Incorrect"
                value={NumFmt.padZero(formResponse.incorrectQCount!)}
            />
            {/* Not Answered */}
            <InfoCardItem
                label="Not Answered"
                value={NumFmt.padZero(store.formDetailExtras.totalAnswerableQuestions - formResponse.attemptedQCount)}
            />
        </InfoCard>
    );

}