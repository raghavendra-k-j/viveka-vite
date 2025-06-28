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


    const response = formDetail?.formResponse;

    let userInfo: {
        id: number;
        name: string;
        email: string | null;
        mobile: string | null;
    };

    if (response?.user) {
        const user = response.user;
        userInfo = {
            id: user.id,
            name: user.name,
            email: user.email ?? null,
            mobile: user.mobile ?? null,
        };
    }
    else {
        const guest = response!.guest!;
        userInfo = {
            id: guest.id,
            name: guest.name,
            email: guest.email ?? null,
            mobile: guest.mobile ?? null,
        };
    }

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border border-default rounded-sm bg-surface shadow-xs">
            {/* Entire header is clickable */}
            <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setExpanded((prev) => !prev)}
                aria-label="Toggle user details"
            >

                <div className="w-6 h-6">
                    <AvatarView fontSize={14} id={userInfo.id} name={userInfo.name} />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-default">{userInfo.name}</div>
                </div>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {expanded && (
                <div className="text-sm text-default divide-y divide-default border-t border-default">
                    <UserInfoItem label="Email" value={userInfo.email ?? "N/A"} />
                    <UserInfoItem label="Mobile" value={userInfo.mobile ?? "N/A"} />
                </div>
            )}
        </div>
    );
}