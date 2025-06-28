import { InfoCard, InfoCardHeader, InfoCardItem } from "./InfoCard";
import { useResponseViewStore } from "../../ResponseViewContext";
import { DateFmt } from "~/core/utils/DateFmt";
import { NumFmt } from "~/core/utils/NumFmt";
import { Badge } from "~/ui/widgets/badges/Badge";
import { TimeFmt } from "~/core/utils/TimeFmt";

export function ResponseOverview() {
    const store = useResponseViewStore();

    return store.formDetail.type.isSurvey
        ? <SurveyResponseOverview />
        : <AssessmentResponseOverview />;
}

function CommonResponseInfo() {
    const store = useResponseViewStore();
    const formResponse = store.formDetail.formResponse!;

    return (
        <>
            <InfoCardItem label="Time Taken" value={TimeFmt.format(formResponse.timeTaken * 5)} />
            <InfoCardItem label="Submitted On" value={DateFmt.datetime(formResponse.submittedAt)} />
            <InfoCardItem label="Submitted Language" value={formResponse.submittedLanguage.name} />
        </>
    );
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
            <InfoCardItem label="Answered" value={answered} />
            <InfoCardItem label="Not Answered" value={notAnswered} />
            <CommonResponseInfo />
        </InfoCard>
    );
}

function AssessmentResponseOverview() {
    const store = useResponseViewStore();
    const formResponse = store.formDetail.formResponse!;
    const formDetail = store.formDetail;

    const marksString = `${NumFmt.roundToStr(formResponse.marks!, 2)} / ${NumFmt.roundToStr(formDetail.totalMarks!, 2)} (${NumFmt.roundToStr(formResponse.percentage!, 2)}%)`;

    function getStatusBadge() {
        if (formResponse.marks! >= formDetail.passingMarks!) {
            return <Badge color="green">Pass</Badge>;
        } else {
            return <Badge color="red">Fail</Badge>;
        }
    }

    return (
        <InfoCard>
            <InfoCardHeader title="Result Overview" />
            {formDetail.passingMarks && <InfoCardItem label="Result" value={getStatusBadge()} />}
            <InfoCardItem label="Marks" value={marksString} />
            <CommonResponseInfo />
            {formResponse.isEvaluated && (
                <InfoCardItem label="Evaluated On" value={DateFmt.datetime(formResponse.evaluatedOn!)} />
            )}
        </InfoCard>
    );
}
