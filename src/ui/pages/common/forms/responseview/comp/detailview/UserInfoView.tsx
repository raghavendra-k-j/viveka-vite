import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AvatarView } from "~/ui/components/avatar/AvatarView";
import { useResponseViewStore } from "../../ResponseViewContext";

function UserInfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="px-3 py-2">
            <div className="text-xs text-secondary font-semibold">{label}</div>
            <div className="text-sm text-default">{value}</div>
        </div>
    );
}

export function UserDetailsView() {
    const { formDetail } = useResponseViewStore();
    const userInfo = {
        id: formDetail?.formResponse?.user?.id ?? formDetail?.formResponse?.guest?.id ?? 0,
        name: formDetail?.formResponse?.user?.name ?? formDetail?.formResponse?.guest?.name ?? "Anonymous",
        email: formDetail?.formResponse?.user?.email ?? formDetail?.formResponse?.guest?.email ?? "N/A",
        mobile: formDetail?.formResponse?.user?.mobile ?? formDetail?.formResponse?.guest?.mobile ?? "N/A",
    };

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border border-slate-200 rounded-sm bg-surface shadow-xs">
            {/* Entire header is clickable */}
            <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setExpanded((prev) => !prev)}
                aria-label="Toggle user details"
            >
                <AvatarView size={28} id={userInfo.id} name={userInfo.name} />
                <div className="flex-1">
                    <div className="text-sm font-medium text-default">{userInfo.name}</div>
                </div>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {expanded && (
                <div className="text-sm text-default divide-y divide-slate-200 border-t border-slate-200">
                    <UserInfoItem label="Email" value={userInfo.email} />
                    <UserInfoItem label="Mobile" value={userInfo.mobile} />
                </div>
            )}
        </div>
    );
}