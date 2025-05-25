import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { FillBlankOptions } from "./QuestionOptions";

export function FillBlankOptionsView(vm: FillBlankOptions) {
    return (
        <div className="flex flex-start">
            <OutlinedButton size="sm" onClick={() => vm.handleAddBlank()}>
                Add Blank
            </OutlinedButton>
        </div>
    );
}