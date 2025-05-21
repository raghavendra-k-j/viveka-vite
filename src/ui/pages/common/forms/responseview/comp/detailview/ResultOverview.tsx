import { InfoCard, InfoCardHeader, InfoCardItem } from "./InfoCard";
import { useResponseViewStore } from "../../ResponseViewContext";
import { DateFmt } from "~/core/utils/DateFmt";
import { NumFmt } from "~/core/utils/NumFmt";
import { Badge } from "~/ui/widgets/badges/Badge";

export function ResponseOverview() {
    const store = useResponseViewStore();

    if (store.formDetail.type.isSurvey) {
        return <SurveyResponseOverview />;
    } else {
        return <AssessmentResponseOverview />;
    }
}

function SurveyResponseOverview() {
    const store = useResponseViewStore();
    const formResponse = store.formDetail.formResponse!;

    const totalQuestions = store.formDetail.totalQuestions ?? 0;
    const answered = formResponse.attemptedQCount ?? 0;
    const notAnswered = totalQuestions - answered;

    return (
        <InfoCard>
            <InfoCardHeader title="Response Overview" />
            <InfoCardItem label="Submitted On" value={DateFmt.datetime(formResponse.submittedAt)} />
            <InfoCardItem label="Submitted Language" value={formResponse.submittedLanguage.name} />
            <InfoCardItem label="Answered" value={answered} />
            <InfoCardItem label="Not Answered" value={notAnswered} />
        </InfoCard>
    );
}

function AssessmentResponseOverview() {
    const store = useResponseViewStore();
    const formResponse = store.formDetail.formResponse!;
    const formDetail = store.formDetail;

    function getStatusBadge() {
        if (formResponse.marks! >= formDetail.passingMarks!) {
            return <Badge color="green">Pass</Badge>;
        }
        else {
            return <Badge color="red">Fail</Badge>;
        }
    }


    return (
        <InfoCard>
            <InfoCardHeader title="Result Overview" />
            {formDetail.passingMarks && (<InfoCardItem label="Result" value={getStatusBadge()} />)}
            <InfoCardItem label="Marks" value={NumFmt.roundToStr(formResponse.marks!, 2)} />
            <InfoCardItem label="Time Taken" value={formResponse.timeTaken} />
            <InfoCardItem label="Submitted On" value={DateFmt.datetime(formResponse.submittedAt)} />
            <InfoCardItem label="Submitted Language" value={formResponse.submittedLanguage.name} />
            <InfoCardItem label="Evaluation Status" value={formResponse.isEvaluated ? "Evaluated" : "Pending"} />
            {formResponse.isEvaluated && (
                <>
                    <InfoCardItem label="Evaluated On" value={DateFmt.datetime(formResponse.evaluatedOn!)} />
                    {formResponse.evaluator && <InfoCardItem label="Evaluated By" value={formResponse.evaluator.name} />}
                </>
            )}
        </InfoCard>
    );
}
