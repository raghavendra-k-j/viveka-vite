import type { Choice } from "~/domain/forms/models/question/QExtras";
import type { ObjectiveQuestionVm } from "../models/ObjectiveQuestionVm";
import { observer } from "mobx-react-lite";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { QuestionCardView } from "./QuestionCardView";
import { colors } from "~/ui/ds/core/colors";
import { FaRegSquare, FaRegCircle } from "react-icons/fa";
import { FaSquareCheck, FaCircleDot } from "react-icons/fa6";
import { GroupQuestionVm } from "../models/GroupQuestionVm";
import { ChoiceText } from "~/ui/components/form/commons/QuestionText";


type ObjectiveQuestionViewProps = {
    vm: ObjectiveQuestionVm;
    parentVm?: GroupQuestionVm;
};

export function ObjectiveQuestionView(props: ObjectiveQuestionViewProps) {
    return (
        <QuestionCardView parent={props.parentVm}>
            {props.vm.base.question}
            <QuestionHeaderView vm={props.vm} />
            {/* <ChoiceList vm={props.vm} /> */}
        </QuestionCardView>
    );
}

type ChoiceListProps = {
    vm: ObjectiveQuestionVm;
};

function ChoiceList(props: ChoiceListProps) {
    const choices = props.vm.choices;
    return (
        <div className="px-4 py-3 flex flex-col gap-1">
            {choices.map((choice) => (
                <ChoiceItem key={choice.id} vm={props.vm} choice={choice} />
            ))}
        </div>
    );
}

type ChoiceItemProps = {
    vm: ObjectiveQuestionVm;
    choice: Choice;
};

export const ChoiceItem = observer(function ChoiceItem({ vm, choice }: ChoiceItemProps) {
    const isMultipleChoice = vm.base.type.isCheckBoxes;
    const isSelected = vm.isSelected(choice);

    const handleClick = () => {
        vm.onChoiceClick(choice);
    };

    const Icon = isMultipleChoice
        ? isSelected
            ? FaSquareCheck
            : FaRegSquare
        : isSelected
            ? FaCircleDot
            : FaRegCircle;

    const iconColor = isSelected ? colors.primary : colors.textTertiary;

    return (
        <button
            onClick={handleClick}
            className={`w-full text-sm text-left text-default flex items-center gap-3 px-4 py-2 rounded-sm transition-colors duration-150 cursor-pointer 
            ${isSelected ? "bg-primary-50" : ""}`}
        >
            <Icon size={20} color={iconColor} />
            <ChoiceText text={choice.text} />
        </button>
    );
});