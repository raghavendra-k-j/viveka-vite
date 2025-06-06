import { CircleStop, Volume2 } from "lucide-react";
import type { QuestionVm } from "../models/QuestionVm";
import { observer } from "mobx-react-lite";
import { colors } from "~/ui/ds/core/colors";

type SpeakButtonProps = {
    vm: QuestionVm;
};

export const SpeakButton = observer(({ vm }: SpeakButtonProps) => {
    const isSpeaking = vm.base.store.isSpeaking(vm);

    const handleClick = () => {
        vm.base.store.toggleSpeak(vm);
    };

    const Icon = isSpeaking ? CircleStop : Volume2;
    const iconColor = isSpeaking ? colors.error : colors.textDefault;

    return (
        <button
            onClick={handleClick}
            aria-label={isSpeaking ? "Stop Speaking" : "Play Question"}
            className={`flex cursor-pointer items-center justify-center rounded-sm p-2 transition-colors duration-200`}
        >
            <Icon size={20} color={iconColor} />
        </button>
    );
});
