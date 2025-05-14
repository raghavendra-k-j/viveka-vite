import { useCallback } from 'react';
import { DialogEntry, useDialogManager } from '~/ui/widgets/dialogmanager';
import { STTDialog, STTDialogProps } from '../sttdialog/STTDialog';
import type { STT } from '~/infra/utils/stt/STT';
import type { Editor as TinyMCEEditor } from 'tinymce';

export function useVoiceDialog(stt: STT, editorRef: React.RefObject<TinyMCEEditor | null>) {
    const dialogManager = useDialogManager();

    return useCallback(() => {
        const dialogEntry: DialogEntry<STTDialogProps> = {
            id: 'voice-dialog',
            component: STTDialog,
            props: {
                stt,
                onClose: (transcription: string) => {
                    editorRef.current?.insertContent(transcription);
                    dialogManager.closeById('voice-dialog');
                },
            },
        };
        dialogManager.show(dialogEntry);
    }, [dialogManager, editorRef, stt]);
}