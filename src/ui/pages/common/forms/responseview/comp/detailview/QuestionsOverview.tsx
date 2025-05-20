import { InfoCard, InfoCardHeader, InfoCardItem } from "./InfoCard";
import { useResponseViewStore } from "../../ResponseViewContext";
import { NumFmt } from "~/core/utils/NumFmt";

export function QuestionsOverview() {

    const store = useResponseViewStore();
    const formResponse = store.formDetail.formResponse!;

    return (
        <InfoCard>
            <InfoCardHeader title="Questions Overview" />
            {/* Total Questions */}
            <InfoCardItem
                label="Total"
                value={NumFmt.padZero(store.formDetail.totalQuestions)}
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
                value={NumFmt.padZero(store.formDetail.totalQuestions - formResponse.attemptedQCount)}
            />
        </InfoCard>
    );

}