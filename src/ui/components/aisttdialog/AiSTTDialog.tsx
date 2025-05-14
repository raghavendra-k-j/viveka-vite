import { Content } from "~/domain/aistt/models/Content";
import { STT } from "~/infra/utils/stt/STT"
import { AiSTTDialogProvider } from "./AiSTTDialogProvider";
import { Dialog, DialogContent, DialogOverlay, DialogScaffold } from "~/ui/widgets/dialogmanager";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { useAiSTTDialogStore } from "./AiSTTDialogContext";
import { Observer } from "mobx-react-lite";
import { ContentsToHtmlService } from "~/domain/aistt/services/ContentsToHtmlService";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";
import { reaction } from "mobx";
import { Mic, MicOff } from "lucide-react";
import styles from "./styles.module.css";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";

export type AiSTTDialogProps = {
    stt: STT;
    onDone: (content: Content) => void;
    onCancel: () => void;
}

export function AiSTTDialog(props: AiSTTDialogProps) {
    return (
        <AiSTTDialogProvider stt={props.stt} onDone={props.onDone} onCancel={props.onCancel}>
            <Body />
        </AiSTTDialogProvider>
    );
}


function Body() {
    return (
        <Dialog>
            <DialogOverlay />
            <DialogScaffold className="p-4">
                <DialogContent className="w-full max-w-md max-h-[400px] flex flex-col">
                    <DialogBody />
                    <DialogFooter />
                </DialogContent>
            </DialogScaffold>
        </Dialog>
    );
}


function DialogBody() {
    const store = useAiSTTDialogStore();
    return (
        <div className="flex flex-col flex-1 p-4 gap-4 overflow-hidden">
            <div className="flex flex-col justify-center items-center">
                <Observer>
                    {() => (
                        <>
                            <button
                                className={`${styles.micButton} ${store.isListening ? styles.listening : ""}`}
                                onClick={() =>
                                    store.isListening ? store.stopListening() : store.startListening()
                                }
                            >
                                {store.isListening ? <MicOff size={24} /> : <Mic size={24} />}
                            </button>
                            <div className="text-base-m text-secondary mt-4">
                                {store.isListening ? "Listening..." : "Click to start listening"}
                            </div>
                        </>
                    )}
                </Observer>
            </div>
            <AiOutputView />
        </div>
    );
}


function AiOutputView() {
    const store = useAiSTTDialogStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const disposer = reaction(
            () => [store.content, store.liveTranscription],
            () => {
                const el = containerRef.current;
                if (el) {
                    el.scrollTop = el.scrollHeight;
                }
            }
        );
        return () => disposer();
    }, [store]);

    return (
        <div ref={containerRef} className="flex-1 overflow-auto">
            <Observer>
                {() => <ContentView content={store.content} />}
            </Observer>
            <Observer>
                {() => (
                    <div
                        className={`text-base-m text-secondary mt-2${!store.content ? " text-center" : ""}`}
                    >
                        {store.liveTranscription}
                    </div>
                )}
            </Observer>
        </div>
    );
}



function ContentView(props: { content?: Content }) {
    if (!props.content) return null;
    return (
        <div className="text-base-m text-default space-y-3">
            {props.content.paragraphs.map((paragraph) => {
                const html = ContentsToHtmlService.convertParagraph(paragraph);
                return (
                    <div key={paragraph.uuid}>
                        <p
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                        <p
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                        <p
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                );
            })}
        </div>
    );
}




function DialogFooter() {

    const store = useAiSTTDialogStore();
    return (
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-slate-200">

            <OutlinedButton
                onClick={() => {
                    store.onClickCancel();
                }}
            >
                Cancel
            </OutlinedButton>
            <FilledButton
                onClick={() => {
                    store.onClickDone();
                }}
            >
                Done
            </FilledButton>
        </div>
    );

}

