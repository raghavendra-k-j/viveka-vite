import { useEffect } from "react";
import { Hourglass, Lock } from "lucide-react";
import { useSubmitStore } from "../SubmitContext";
import { DateFmt } from "~/core/utils/DateFmt";

interface StatusBannerProps {
    icon: React.ReactNode;
    bgColor: string;
    iconBgColor: string;
    borderColor: string;
    textColor: string;
    children: React.ReactNode;
}

function StatusBanner({ icon, bgColor, iconBgColor, borderColor, textColor, children }: StatusBannerProps) {
    return (
        <div className={`w-full flex items-center gap-3 rounded-md px-4 py-3 ${bgColor} ${borderColor} ${textColor}`}>
            <div className={`p-2 rounded-md flex items-center justify-center ${iconBgColor}`}>
                {icon}
            </div>
            <p className="text-sm leading-relaxed">{children}</p>
        </div>
    );
}

export function NotStartedInfoView() {
    const store = useSubmitStore();
    const startDate = store.formDetail.startDate;

    useEffect(() => {
        const now = new Date();
        const timeUntilStart = startDate.getTime() - now.getTime();

        if (timeUntilStart > 0) {
            const timeout = setTimeout(() => {
                window.location.reload();
            }, timeUntilStart);

            return () => clearTimeout(timeout);
        }
    }, [startDate]);

    return (
        <StatusBanner
            icon={<Hourglass size={16} />}
            bgColor="bg-blue-50"
            iconBgColor="bg-blue-100"
            borderColor="border border-blue-200"
            textColor="text-blue-800"
        >
            This {store.formDetail.type.name.toLowerCase()} will start on{" "}
            <span className="font-semibold">{DateFmt.datetime(startDate)}</span>. Please wait until then.
        </StatusBanner>
    );
}

export function ClosedInfoView() {
    const store = useSubmitStore();
    const endDate = new Date(store.formDetail.endDate);

    return (
        <StatusBanner
            icon={<Lock size={16} />}
            bgColor="bg-red-50"
            iconBgColor="bg-red-100"
            borderColor="border border-red-200"
            textColor="text-red-800"
        >
            This {store.formDetail.type.name.toLowerCase()} ended on{" "}
            <span className="font-semibold">{DateFmt.datetime(endDate)}</span>. You can no longer start it.
        </StatusBanner>
    );
}
