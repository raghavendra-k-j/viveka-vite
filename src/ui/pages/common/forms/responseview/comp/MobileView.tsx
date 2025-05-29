import { useState, ReactNode } from "react";
import { DetailView } from "./detailview/DetailView";
import { QuestionList } from "./questionlist/QuestionList";
import { X } from "lucide-react";
import { useResponseViewStore } from "../ResponseViewContext";

function TabButton({ active, label, onClick, }: { active: boolean; label: string; onClick: () => void; }) {
    return (
        <button
            className={`flex-1 py-2 px-3 font-medium text-base-m border-b-2 ${active ? "border-primary text-primary" : "border-transparent text-default"
                }`}
            onClick={onClick}
            type="button"
        >
            {label}
        </button>
    );
}

function TabBar({
    activeTab,
    setActiveTab,
}: {
    activeTab: "details" | "questions";
    setActiveTab: (tab: "details" | "questions") => void;
}) {
    const store = useResponseViewStore();
    return (
        <div className="flex border-b border-default">
            <div className="flex flex-grow">
                <TabButton
                    active={activeTab === "details"}
                    label="Details"
                    onClick={() => setActiveTab("details")}
                />
                <TabButton
                    active={activeTab === "questions"}
                    label="Questions"
                    onClick={() => setActiveTab("questions")}
                />
            </div>
            <button
                type="button"
                className="py-2 px-3 font-medium text-base-m border-b-2 border-transparent text-default"
                onClick={() => store.onClose()}
            >
                <X />
            </button>
        </div>
    );
}



function TabView({ children }: { children: ReactNode }) {
    return (
        <>{children}</>
    );
}

export function MobileView() {
    const [activeTab, setActiveTab] = useState<"details" | "questions">("details");

    return (
        <div className="flex flex-col h-full min-h-0 bg-surface">
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabView>
                {activeTab === "details" && (
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <DetailView />
                    </div>
                )}
                {activeTab === "questions" && <QuestionList />}
            </TabView>
        </div>
    );
}
