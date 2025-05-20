import { NumFmt } from "~/core/utils/NumFmt";
import { TimeFmt } from "~/core/utils/TimeFmt";
import { ReadMoreText } from "~/ui/widgets/text/ReadMoreText";
import { useResponseViewStore } from "../../ResponseViewContext";
import { InfoCard, InfoCardItem } from "./InfoCard";

export function FormInfoData() {
    const { formDetail } = useResponseViewStore();

    return (
        <div className="flex flex-col gap-2">
            <ReadMoreText
                className="text-base-m text-default font-semibold"
                text={formDetail.title}
            />
            <InfoCard>
                <InfoCardItem
                    label="Total Questions"
                    value={NumFmt.padZero(formDetail.totalQuestions)}
                />
                {formDetail.totalMarks && (<InfoCardItem
                    label="Total Marks"
                    value={NumFmt.roundToStr(formDetail.totalMarks, 2)}
                />)}
                {formDetail.timeLimit && (<InfoCardItem
                    label="Time Limit"
                    value={TimeFmt.format(formDetail.timeLimit)}
                />)}
            </InfoCard>
        </div>
    );
}
