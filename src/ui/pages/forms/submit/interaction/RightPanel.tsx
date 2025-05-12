import { observer } from "mobx-react-lite";
import { useInteractionStore } from "./InteractionContext";
import type { GroupQuestionVm } from "./models/GroupQuestionVm";
import type { QuestionVm } from "./models/QuestionVm";

export const RightPanel = () => {
    const store = useInteractionStore();
    const { questions } = store;

    return (
        <div className="w-[300px] bg-surface border-l shadow-sm border-slate-200 p-4 overflow-y-auto">
            <div className="text-lg font-semibold mb-3">Questions</div>
            <div className="grid grid-cols-3 gap-4">
                {questions.map((q, index) => (
                    <QuestionItem key={index} vm={q} index={index} />
                ))}
            </div>
        </div>
    );
};

const QuestionItem = observer(({ vm, index }: { vm: QuestionVm; index: number }) => {
    const isGroup = vm.base.type.isGroup;
    const groupVm = isGroup ? (vm as GroupQuestionVm) : undefined;

    return (
        <div className="flex flex-col">
            {/* Main Question */}
            <QuestionListRow label={`${index + 1}`} vm={vm} />

            {/* Group / Subquestions */}
            {groupVm && (
                <div className="ml-2 mt-1 space-y-1">
                    {groupVm.subQuestions.map((child, idx) => (
                        <QuestionListRow
                            key={idx}
                            label={`${index + 1}.${idx + 1}`}
                            vm={child}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

const QuestionListRow = observer(
    ({ label, vm }: { label: string; vm: QuestionVm }) => {
        const isAnswered = vm.isAnswered;

        return (
            <div
                className="flex items-center justify-center px-3 py-3 rounded-md transition hover:bg-gray-50 cursor-pointer"
                style={{
                    backgroundColor: isAnswered ? "rgb(16, 185, 129)" : "rgb(248, 113, 113)", // Emerald for answered, Red for unanswered
                }}
            >
                {/* Question number avatar */}
                <div
                    className="flex justify-center items-center w-10 h-10 rounded-full text-white text-lg font-semibold"
                    style={{
                        backgroundColor: isAnswered ? "rgb(16, 185, 129)" : "rgb(248, 113, 113)", // same color as the background
                    }}
                >
                    {label}
                </div>
            </div>
        );
    }
);
