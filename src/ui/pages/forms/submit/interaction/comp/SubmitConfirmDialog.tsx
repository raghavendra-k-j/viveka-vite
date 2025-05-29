import { FramedDialog } from "~/ui/widgets/dialogmanager";
import { InteractionStore } from "../InteractionStore";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import FilledButton from "~/ui/widgets/button/FilledButton";

export interface SubmitConfirmDialogProps {
    store: InteractionStore;
    onConfirm: () => void;
    onCancel: () => void;
}

export function SubmitConfirmDialog(props: SubmitConfirmDialogProps) {
    const { store, onConfirm, onCancel } = props;

    const isAssessment = store.formDetail?.type?.isAssessment;
    const isSurvey = store.formDetail?.type?.isSurvey;

    if (!isAssessment && !isSurvey) {
        throw new Error("SubmitConfirmDialog: Form must be either an assessment or a survey.");
    }

    const message = isAssessment
        ? "Double-check your answers—once you submit, you won’t be able to make any changes."
        : "Thanks for sharing your thoughts! Once you submit, your responses are final and can’t be edited.";

    const confirmLabel = isAssessment
        ? "Submit Now"
        : "Send Responses";

    return (
        <FramedDialog
            scaffoldClassName="p-4"
            contentClassName="p-4 w-full max-w-sm"
            onClose={onCancel}
        >
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-default">
                    Ready to Submit?
                </h2>
                <p className="text-base text-secondary mt-2">
                    {message}
                </p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <OutlinedButton onClick={onCancel}>Go Back</OutlinedButton>
                <FilledButton onClick={onConfirm}>{confirmLabel}</FilledButton>
            </div>
        </FramedDialog>
    );
}
