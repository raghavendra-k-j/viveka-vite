import { Choice } from "~/domain/forms/models/question/QExtras";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaRegSquare, FaRegCircle } from "react-icons/fa";
import { FaSquareCheck, FaCircleDot } from "react-icons/fa6";

export type ChoiceListProps = {
    choices: Choice[];
    selectedChoices: number[];
    correctChoices: number[] | null;
    isMultiSelect: boolean;
};

export function ChoiceListView({
    choices,
    selectedChoices,
    correctChoices,
    isMultiSelect,
}: ChoiceListProps) {
    return (
        <div className="flex flex-col gap-3 px-3">
            {choices.map((choice, index) => {
                const isSelected = selectedChoices.includes(index);
                const isCorrect = correctChoices?.includes(index);
                return (
                    <ChoiceItemReadonly
                        key={index}
                        choice={choice}
                        index={index}
                        isSelected={isSelected}
                        isCorrect={isCorrect}
                        showCorrectness={!!correctChoices}
                        isMultiSelect={isMultiSelect}
                    />
                );
            })}
        </div>
    );
}

type ChoiceItemReadonlyProps = {
    choice: Choice;
    index: number;
    isSelected: boolean;
    isCorrect: boolean | undefined;
    showCorrectness: boolean;
    isMultiSelect: boolean;
};

function ChoiceItemReadonly({
    choice,
    isSelected,
    isCorrect,
    showCorrectness,
    isMultiSelect,
}: ChoiceItemReadonlyProps) {
    const isIncorrect = isSelected && showCorrectness && isCorrect === false;
    const textColorClass = "text-default";
    const getCorrectnessIcon = () => {
        if (!showCorrectness) return null;
        if (isCorrect) return <FaCheckCircle size={18} className="text-green-600" aria-label="Correct" />;
        if (isIncorrect) return <FaTimesCircle size={18} className="text-red-600" aria-label="Incorrect" />;
        return null;
    };

    const Icon = isMultiSelect
        ? isSelected
            ? FaSquareCheck
            : FaRegSquare
        : isSelected
            ? FaCircleDot
            : FaRegCircle;

    const iconColor = isSelected ? "text-primary-600" : "text-gray-400";

    const backgroundClass = isSelected ? "bg-slate-50" : "bg-transparent";

    const correctnessIcon = getCorrectnessIcon();

    return (
        <div
            className={`flex items-center gap-3 px-2 py-1 justify-between rounded-sm ${backgroundClass}`}
        >
            <div className="flex items-center gap-3">
                <Icon size={20} className={iconColor} />
                <span className={`text-sm ${textColorClass}`}>{choice.text}</span>
            </div>
            {correctnessIcon && <div>{correctnessIcon}</div>}
        </div>
    );
}
