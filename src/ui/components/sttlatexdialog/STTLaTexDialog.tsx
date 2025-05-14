import { useEffect, useMemo } from "react";
import { STTLaTexDialogContext, useSTTLaTexDialogStore } from "./STTLaTexDialogContext";
import { STTLaTexDialogStore } from "./STTLaTexDialogStore";
import { Observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogOverlay, DialogScaffold } from "~/ui/widgets/dialogmanager";
import { Mic } from "lucide-react";
import styles from "./styles.module.css";
import FilledButton from "~/ui/widgets/button/FilledButton";

function STTLaTexDialogContextProvider({ children, stt }: { children: React.ReactNode, stt: any }) {
    const store = useMemo(() => new STTLaTexDialogStore({ stt }), [stt]);
    return (
        <STTLaTexDialogContext.Provider value={store}>
            {children}
        </STTLaTexDialogContext.Provider>
    );
}

export type STTLaTexDialogProps = {
    stt: any;
    onClose: (transaction: string) => void;
}

export function STTLaTexDialog({ stt, onClose }: STTLaTexDialogProps) {
    return (
        <STTLaTexDialogContextProvider stt={stt}>
            <Body onClose={onClose} />
        </STTLaTexDialogContextProvider>
    );
}

function Body({ onClose }: { onClose: (transaction: string) => void }) {
    const store = useSTTLaTexDialogStore();

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

    const handleStopListening = async () => {
        store.stt.stop();
        const latext = await store.generateLaTex();
        onClose(latext ?? "e=mc^2");
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
