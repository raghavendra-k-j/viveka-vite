import { useEffect, useRef } from 'react';
import { STT } from '~/infra/utils/stt/STT';
import FilledButton from '~/ui/widgets/button/FilledButton';
import { useDialogManager } from '~/ui/widgets/dialogmanager';
import { AiSTTDialog } from '~/ui/components/aisttdialog/AiSTTDialog';


export default function HomePage() {
    const dialogManager = useDialogManager();

    const sttRef = useRef<STT | null>(null);

    useEffect(() => {
        if (!sttRef.current) {
            sttRef.current = new STT();
        }
    }, []);

    const handleStartListening = () => {
        dialogManager.show({
            id: 'ai-voice-dialog',
            component: AiSTTDialog,
            props: {
                stt: sttRef.current!,
                onDone: () => {
                    dialogManager.closeById('ai-voice-dialog');
                },
                onCancel: () => {
                    dialogManager.closeById('ai-voice-dialog');
                },
            },
        });
    };

    return (
        <FilledButton onClick={handleStartListening}>
            Start Listening
        </FilledButton>
    );
}
