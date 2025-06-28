import { FramedDialog } from "~/ui/widgets/dialogmanager";
import { InteractionStore } from "../InteractionStore";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import FilledButton from "~/ui/widgets/button/FilledButton";

export interface QuitFormDialogProps {
    store: InteractionStore;
    onConfirmQuit: () => void;
    onCancel: () => void;
}

export function QuitFormDialog(props: QuitFormDialogProps) {
    const { store, onConfirmQuit, onCancel } = props;

    const isAssessment = store.formDetail?.type?.isAssessment;
    const isSurvey = store.formDetail?.type?.isSurvey;

    if (!isAssessment && !isSurvey) {
        throw new Error("QuitFormDialog: Form must be either an assessment or a survey.");
    }

    const message = isAssessment
        ? "If you quit now, all your answers will be lost. You can retake the assessment later, but you will have to start from the beginning."
        : "If you leave now, your survey responses will be discarded. Are you sure you want to lose your progress?";

    const title = isAssessment
        ? "Confirm Exit"
        : "Confirm Leaving";

    const confirmLabel = isAssessment
        ? "Yes, Quit Assessment"
        : "Yes, Discard";

    return (
        <FramedDialog
            scaffoldClassName="p-4"
            contentClassName="p-4 w-full max-w-sm"
            onClose={onCancel}
        >
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-default">
                    {title}
                </h2>
                <p className="text-base text-secondary mt-2">
                    {message}
                </p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <OutlinedButton onClick={onCancel}>Cancel</OutlinedButton>
                <FilledButton onClick={onConfirmQuit}>{confirmLabel}</FilledButton>
            </div>
        </FramedDialog>
    );
}
