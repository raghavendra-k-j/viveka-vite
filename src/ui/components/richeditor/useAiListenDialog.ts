import { useCallback } from 'react';
import { DialogEntry, useDialogManager } from '~/ui/widgets/dialogmanager';
import type { STT } from '~/infra/utils/stt/STT';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { AiSTTDialog, AiSTTDialogProps } from '../aisttdialog/AiSTTDialog';

export function useAiListenDialog(stt: STT, editorRef: React.RefObject<TinyMCEEditor | null>) {
    const dialogManager = useDialogManager();

    return useCallback(() => {
        const dialogEntry: DialogEntry<AiSTTDialogProps> = {
            id: 'ai-voice-dialog',
            component: AiSTTDialog,
            props: {
                stt,
                onDone: (content) => {
                    const markdown = content.toMarkdown();
                    editorRef.current?.insertContent(markdown);
                    dialogManager.closeById('ai-voice-dialog');
                },
                onCancel: () => {
                    dialogManager.closeById('ai-voice-dialog');
                },
            },
        };
        dialogManager.show(dialogEntry);
    }, [dialogManager, editorRef, stt]);
}