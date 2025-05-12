import { useEffect, useMemo } from "react";
import { STTDialogContext, useSTTDialogStore } from "./STTDialogContext";
import { STTDialogStore } from "./STTDialogStore";
import { Observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogOverlay, DialogScaffold } from "~/ui/widgets/dialogmanager";
import { Mic } from "lucide-react";
import styles from "./styles.module.css";
import FilledButton from "~/ui/widgets/button/FilledButton";

function STTDialogContextProvider({ children, stt }: { children: React.ReactNode, stt: any }) {
    const store = useMemo(() => new STTDialogStore({ stt }), [stt]);
    return (
        <STTDialogContext.Provider value={store}>
            {children}
        </STTDialogContext.Provider>
    );
}

export type STTDialogProps = {
    stt: any;
    onClose: (transaction: string) => void;
}

export function STTDialog({ stt, onClose }: STTDialogProps) {
    return (
        <STTDialogContextProvider stt={stt}>
            <Body onClose={onClose} />
        </STTDialogContextProvider>
    );
}

function Body({ onClose }: { onClose: (transaction: string) => void }) {
    const store = useSTTDialogStore();

    useEffect(() => {
        if (!store.stt.isRecognizing()) {
            const timeoutId = setTimeout(() => store.stt.start(), 500);
            return () => {
                clearTimeout(timeoutId);
                store.stt.abort();
            };
        }

        return () => store.stt.abort();
    }, [store.stt]);

    const handleStopListening = () => {
        store.stt.stop();
        onClose(store.transcription);
    };

    return (
        <Dialog>
            <DialogOverlay />
            <DialogScaffold className="p-6">
                <DialogContent className="p-6 w-full max-w-[400px] flex flex-col items-center justify-center gap-6">

                    <div className="my-2">
                        <Observer>
                            {() => (
                                <div className={`${styles.micContainer} ${store.isListening ? styles.listening : ''}`}>
                                    <Mic className={`${styles.micIcon} ${store.isListening ? styles.listening : ''}`} />
                                </div>
                            )}
                        </Observer>
                    </div>

                    <Observer>
                        {() => (
                            store.sttError ? (
                                <div className="text-error text-center">
                                    {store.sttError.message}
                                </div>
                            ) : (
                                <>
                                    <div className="w-full h-auto max-h-[100px] overflow-y-auto text-default text-center">
                                        {store.transcription.length > 0 ? store.transcription : "· · · "}
                                    </div>
                                    <FilledButton className="mt-4 w-full" onClick={store.isListening ? handleStopListening : () => store.stt.start()}>
                                        {store.isListening ? "Stop" : "Start"}
                                    </FilledButton>
                                </>
                            )
                        )}
                    </Observer>

                </DialogContent>
            </DialogScaffold>
        </Dialog>
    );
}
