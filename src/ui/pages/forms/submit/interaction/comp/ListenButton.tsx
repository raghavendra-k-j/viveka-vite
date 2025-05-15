import { useCallback } from "react";
import type { STT } from "~/infra/utils/stt/STT";
import { useDialogManager, type DialogEntry } from "~/ui/widgets/dialogmanager";
import { Mic } from "lucide-react";
import { AiSTTDialog, AiSTTDialogProps } from "~/ui/components/aisttdialog/AiSTTDialog";

type ListenButtonProps = {
    stt: STT;
    onResult: (transaction: string) => void;
};

export function ListenButton({ stt, onResult }: ListenButtonProps) {
    const dialogManager = useDialogManager();

    const openVoiceDialog = useCallback(() => {
        const dialogEntry: DialogEntry<AiSTTDialogProps> = {
            id: "voice-input-dialog",
            component: AiSTTDialog,
            props: {
                stt,
                allowAi: false,
                enableAi: false,
                onDone(content) {
                    onResult(content.toPlainText());
                    dialogManager.closeById("voice-input-dialog");
                },
                onCancel() {
                    dialogManager.closeById("voice-input-dialog");
                },
            }
        };
        dialogManager.show(dialogEntry);
    }, [stt, onResult, dialogManager]);

    return (
        <button
            onClick={openVoiceDialog}
            className="p-2 cursor-pointer rounded-sm bg-surface hover:bg-primary-50 transition-colors duration-200"
            aria-label="Start Voice Input"
        >
            <Mic size={20} className="text-default" />
        </button>
    );
}
