import { Badge } from "~/ui/widgets/badges/Badge";
import { RDQuestionVm } from "../../models/QuestionVm";
import { NumFmt } from "~/core/utils/NumFmt";


export function MarksGainedBadge({ vm }: { vm: RDQuestionVm }) {
    const color = vm.hasPositiveGainedMarks ? "green" : "red";
    return (
        <Badge color={color}>
            Marks: {NumFmt.roundToStr(vm.gainedMarks!, 2)} / {NumFmt.roundToStr(vm.marks!, 2)}
        </Badge>
    );
}


type UserResponseStatusViewProps = {
    vm: RDQuestionVm;
};

export function UserResponseStatusView({ vm }: UserResponseStatusViewProps) {


    {/* Not Answered */ }
    if (!vm.isAnswered) {
        return (
            <Badge color="yellow">
                Not Answered
            </Badge>
        );
    }

    {/* Answered: Question has No Marks */ }
    if (vm.marks == null) {
        return (
            <Badge color="blue">
                Answered
            </Badge>
        );
    }

    {/* Incorrect: Question has Marks and Not Positive Gained Marks */ }
    if (vm.hasMarks && !vm.hasPositiveGainedMarks) {
        return (
            <Badge color="red">
                Incorrect
            </Badge>
        );
    }

    {/* Partially Correct: Question has Marks and Positive Gained Marks */ }
    if (vm.gainedMarks! > 0 && vm.gainedMarks! < vm.marks!) {
        return (
            <Badge color="green">
                Partially Correct
            </Badge>
        );
    }

    {/* Correct: Question has Marks and Positive Gained Marks */ }
    if (vm.gainedMarks === vm.marks) {
        return (
            <Badge color="green">
                Correct
            </Badge>
        );
    }

    return null;
}