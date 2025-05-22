import { useEffect } from "react";
import { Hourglass, Lock } from "lucide-react";
import { useSubmitStore } from "../SubmitContext";
import { DateFmt } from "~/core/utils/DateFmt";
import { BasicBanner } from "~/ui/widgets/banner/BasicBanner";

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
        <BasicBanner
            variant="info"
            icon={<Hourglass size={16} />}
            description={
                <span className="font-medium">
                    This {store.formDetail.type.name.toLowerCase()} will start on{" "}
                    <span className="font-semibold">{DateFmt.datetime(startDate)}</span>. Please wait until then.
                </span>
            }
        />
    );
}

export function ClosedInfoView() {
    const store = useSubmitStore();
    const endDate = new Date(store.formDetail.endDate);

    return (
        <BasicBanner
            variant="danger"
            icon={<Lock size={16} />}
            description={
                <span className="font-medium">
                    This {store.formDetail.type.name.toLowerCase()} ended on{" "}
                    <span className="font-semibold">{DateFmt.datetime(endDate)}</span>. You can no longer start it.
                </span>
            }
        />
    );
}
