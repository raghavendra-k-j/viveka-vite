import { X } from "lucide-react";
import { useResponseViewStore } from "../ResponseViewContext";
import { DetailView } from "./detailview/DetailView";
import { QuestionList } from "./questionlist/QuestionList";

function HeaderView() {
    const store = useResponseViewStore();
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white rounded-t-sm">
            <h1 className="text-lg font-semibold">Response Overview</h1>
            <button
                type="button"
                className="px-3 py-1 font-medium text-base text-default hover:text-primary"
                onClick={() => {
                    store.onClose();
                }}
            >
                <X/>
            </button>
        </div>
    );
}

export function DesktopView() {
    return (
        <div className="h-full flex flex-col min-h-0">
            <HeaderView />
            <div className="flex flex-row flex-1 min-h-0">
                <div className="w-[400px] min-w-[400px] h-full border-r border-slate-200 overflow-y-auto rounded-s-sm min-h-0">
                    <DetailView />
                </div>
                <div className="flex-1 h-full rounded-e-sm min-h-0 bg-surface flex flex-col">
                    <QuestionList />
                </div>
            </div>
        </div>
    );
}
