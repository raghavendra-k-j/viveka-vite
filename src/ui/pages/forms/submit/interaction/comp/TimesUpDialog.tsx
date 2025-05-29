import { FramedDialog } from "~/ui/widgets/dialogmanager";
import FilledButton from "~/ui/widgets/button/FilledButton";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { AlarmClockOff } from "lucide-react";
import { InteractionStore } from "../InteractionStore";

export interface TimesUpDialogProps {
    store: InteractionStore;
    onSubmit: () => void;
    onQuit: () => void;
}

export function TimesUpDialog({ onSubmit, onQuit }: TimesUpDialogProps) {
    return (
        <FramedDialog
            scaffoldClassName="p-4"
            contentClassName="p-4 w-full max-w-sm"
            onClose={() => { }}
        >
            <div className="flex flex-col items-center text-center">
                <AlarmClockOff size={48} className="text-primary mb-4" />
                <h2 className="text-lg font-semibold text-default">
                    Time’s Up
                </h2>
                <p className="text-base text-secondary mt-1">
                    Your time for the assessment has expired. Please submit your answers now.
                </p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <OutlinedButton onClick={onQuit}>
                    Cancel
                </OutlinedButton>
                <FilledButton onClick={onSubmit}>
                    Submit Assessment
                </FilledButton>
            </div>
        </FramedDialog>
    );
}
