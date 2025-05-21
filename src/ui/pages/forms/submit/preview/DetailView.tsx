import {
    Clock,
    CalendarDays,
    ClipboardList,
    AsteriskIcon,
    Award,
} from "lucide-react";
import { NumFmt } from "~/core/utils/NumFmt";
import { DateFmt } from "~/core/utils/DateFmt";
import { TimeFmt } from "~/core/utils/TimeFmt";

export function DetailView({ formDetail }: { formDetail: any }) {
    return (
        <div className="flex border-t border-default flex-col text-sm divide-y divide-default text-default">
            <DetailItem
                icon={<ClipboardList size={16} />}
                label="Total Questions"
                value={formDetail.totalQuestions.toString()}
                colorClasses="bg-yellow-50 text-yellow-600"
            />
            {formDetail.totalMarks != null && (
                <DetailItem
                    icon={<Award size={16} />}
                    label="Total Marks"
                    value={NumFmt.roundToStr(formDetail.totalMarks)}
                    colorClasses="bg-teal-50 text-teal-600"
                />
            )}
            {formDetail.passingMarks != null && (
                <DetailItem
                    icon={<AsteriskIcon size={16} />}
                    label="Passing Marks"
                    value={NumFmt.roundToStr(formDetail.passingMarks)}
                    colorClasses="bg-purple-50 text-purple-600"
                />
            )}
            {formDetail.timeLimit != null && (
                <DetailItem
                    icon={<Clock size={16} />}
                    label="Time Limit"
                    value={TimeFmt.formatLong(formDetail.timeLimit)}
                    colorClasses="bg-blue-50 text-blue-600"
                />
            )}
            <DetailItem
                icon={<CalendarDays size={16} />}
                label="Start Date"
                value={DateFmt.datetime(formDetail.startDate)}
                colorClasses="bg-indigo-50 text-indigo-600"
            />
            <DetailItem
                icon={<CalendarDays size={16} />}
                label="End Date"
                value={DateFmt.datetime(formDetail.endDate)}
                colorClasses="bg-rose-50 text-rose-600"
            />
        </div>
    );
}

function DetailItem({
    icon,
    label,
    value,
    colorClasses,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    colorClasses: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-2 px-4">
            <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-md ${colorClasses}`}>{icon}</div>
                <span className="font-medium">{label}</span>
            </div>
            <span>{value}</span>
        </div>
    );
}
