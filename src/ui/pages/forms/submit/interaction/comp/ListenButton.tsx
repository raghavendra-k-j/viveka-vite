import { useCallback } from "react";
import type { STT } from "~/infra/utils/stt/STT";
import { STTDialog, type STTDialogProps } from "~/ui/components/sttdialog/STTDialog";
import { useDialogManager, type DialogEntry } from "~/ui/widgets/dialogmanager";
import { Mic } from "lucide-react";

type ListenButtonProps = {
    stt: STT;
    onResult: (transaction: string) => void;
};

export function ListenButton({ stt, onResult }: ListenButtonProps) {
    const dialogManager = useDialogManager();

    const openVoiceDialog = useCallback(() => {
        const dialogEntry: DialogEntry<STTDialogProps> = {
            id: "voice-input-dialog",
            component: STTDialog,
            props: {
                stt,
                onClose: (result: string) => {
                    onResult(result);
                    dialogManager.pop();
                }
            }
        };
        dialogManager.show(dialogEntry);
    }, [stt, onResult]);

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
