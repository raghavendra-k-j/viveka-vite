import { observer } from "mobx-react-lite";
import { useInteractionStore } from "./InteractionContext";
import type { GroupQuestionVm } from "./models/GroupQuestionVm";
import type { QuestionVm } from "./models/QuestionVm";

export const RightPanel = () => {
    const store = useInteractionStore();
    const { questions } = store;

    return (
        <div className="w-full sm:w-[300px] bg-surface border-l shadow-sm border-slate-200 p-4 overflow-y-auto h-full">
            <div className="text-base font-semibold mb-3">Questions</div>

            {/* Improved Legends with full text: Answered and Unanswered */}
            <div className="flex items-center space-x-8 mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-100 border-2 border-blue-300 rounded-full transition-colors hover:bg-blue-200" />
                    <span className="text-sm font-medium text-gray-700">Answered</span>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full transition-colors hover:bg-gray-100" />
                    <span className="text-sm font-medium text-gray-700">Unanswered</span>
                </div>
            </div>


            {/* Grid layout with dynamic columns */}
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(48px,1fr))] gap-3 sm:gap-4">
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
            <QuestionListRow label={`${index + 1}`} vm={vm} />
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

        const baseContainer =
            "flex items-center justify-center px-2 py-2 rounded-md border text-sm transition cursor-pointer shadow-xs hover:shadow";

        // Container color styles
        const container = isAnswered
            ? `${baseContainer} bg-blue-100 border-blue-200 hover:bg-blue-200`
            : `${baseContainer} bg-white border-gray-200 hover:bg-gray-100`;

        const avatarBase =
            "flex justify-center items-center w-8 h-8 rounded-full font-semibold text-xs border";

        const avatarStyle = isAnswered
            ? `${avatarBase} bg-white text-blue-600 border-blue-400`
            : `${avatarBase} bg-gray-100 text-gray-700 border-gray-300`;

        return (
            <div className={container}>
                <div className={avatarStyle}>
                    {label}
                </div>
            </div>
        );
    }
);
