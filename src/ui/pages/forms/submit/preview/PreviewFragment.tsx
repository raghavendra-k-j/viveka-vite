import { ReadMoreText } from "~/ui/widgets/text/ReadMoreText";
import { AppBar } from "../comp/AppBar";
import { useSubmitStore } from "../SubmitContext";
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
import Button from "~/ui/widgets/button/FilledButton";
import type { Language } from "~/domain/forms/models/Language";
import AppBarLogo from "~/ui/components/AppBarLogo";

export function PreviewFragment() {
    return (
        <div className="flex flex-col">
            <AppBar
                leading={<AppBarLogo />}
            />
            <div className="flex justify-center my-4 mx-4">
                <FormDetailCard />
            </div>
        </div>
    );
}

function FormDetailCard() {
    const store = useSubmitStore();
    const { formDetail } = store;

    return (
        <div className="flex flex-col bg-white border border-slate-200 rounded-sm shadow-md max-w-[576px] w-full">
            <div className="flex flex-col mb-2 px-6 py-4">
                <ReadMoreText text={formDetail.title} maxChars={120} className="font-semibold text-[17px] text-default" />
                {formDetail.description && (
                    <ReadMoreText maxChars={120} className="text-secondary text-sm mt-1" text={formDetail.description} />
                )}
            </div>

            <div className="flex border-t border-slate-200 flex-col text-sm divide-y divide-slate-200 text-default">
                <ListItem
                    icon={<ClipboardList size={16} />}
                    label="Total Questions"
                    value={formDetail.totalQuestions.toString()}
                    colorClasses="bg-yellow-50 text-yellow-500"
                />
                {formDetail.totalMarks != null && (
                    <ListItem
                        icon={<Award size={16} />}
                        label="Total Marks"
                        value={NumFmt.roundToStr(formDetail.totalMarks)}
                        colorClasses="bg-green-50 text-green-500"
                    />
                )}
                {formDetail.passingMarks != null && (
                    <ListItem
                        icon={<AsteriskIcon size={16} />}
                        label="Passing Marks"
                        value={NumFmt.roundToStr(formDetail.passingMarks)}
                        colorClasses="bg-purple-50 text-purple-500"
                    />
                )}
                {formDetail.timeLimit != null && (
                    <ListItem
                        icon={<Clock size={16} />}
                        label="Time Limit"
                        value={TimeFmt.format(formDetail.timeLimit)}
                        colorClasses="bg-blue-50 text-blue-500"
                    />
                )}
                <ListItem
                    icon={<CalendarDays size={16} />}
                    label="Start Date"
                    value={DateFmt.datetime(formDetail.startDate)}
                    colorClasses="bg-indigo-50 text-indigo-500"
                />
                <ListItem
                    icon={<CalendarDays size={16} />}
                    label="End Date"
                    value={DateFmt.datetime(formDetail.endDate)}
                    colorClasses="bg-rose-50 text-rose-500"
                />
            </div>

            <StartFormFooter />
        </div>
    );
}

function ListItem({
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
        <div className="flex items-center justify-between gap-4 py-2 px-6">
            <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-md ${colorClasses}`}>
                    {icon}
                </div>
                <span className="font-medium">{label}</span>
            </div>
            <span>{value}</span>
        </div>
    );
}


function StartFormFooter() {
    const store = useSubmitStore();
    const buttonText = store.formDetail.type.isAssessment ? "Start Assessment" : "Start Survey";
    return (
        <div className="flex flex-col px-4 py-4 border-t border-slate-200">
            <SelectLanguage />
            <Button onClick={() => store.onClickStart()}>{buttonText}</Button>
        </div>
    );
}

function SelectLanguage() {
    const store = useSubmitStore();
    const { languages } = store.formDetail;

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = languages.find(lang => lang.id === event.target.value);
        if (selectedLanguage) {
            store.onLanguageSelected(selectedLanguage);
        }
    };

    return (
        <div className="flex items-center mb-4">
            <label htmlFor="flex language-select flex-1" className="font-medium text-sm mr-3">
                Select Language:
            </label>
            <select
                id="language-select"
                value={store.selectedLanguage?.id || ''}
                onChange={handleLanguageChange}
                className="p-2 border border-slate-300 flex-1 rounded-md bg-white text-sm"
            >
                {languages.map((language: Language) => (
                    <option key={language.id} value={language.id}>
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
    );
}