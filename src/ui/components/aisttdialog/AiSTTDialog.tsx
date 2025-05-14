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
import { Loader, Mic, MicOff, X } from "lucide-react";
import styles from "./styles.module.css";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import clsx from "clsx";

export type AiSTTDialogProps = {
    stt: STT;
    allowAi: boolean;
    enableAi: boolean;
    onDone: (content: Content) => void;
    onCancel: () => void;
}

export function AiSTTDialog(props: AiSTTDialogProps) {
    return (
        <AiSTTDialogProvider stt={props.stt} onDone={props.onDone} onCancel={props.onCancel} allowAi={props.allowAi} enableAi={props.enableAi}>
            <Body />
        </AiSTTDialogProvider>
    );
}


function Body() {
    const store = useAiSTTDialogStore();
    return (
        <Dialog onClose={() => store.onClickCancel()}>
            <DialogOverlay onClick={() => store.onClickCancel()} />
            <DialogScaffold className="p-4">
                <DialogContent className="w-full max-w-[400px] min-h-[300px] max-h-[400px] flex flex-col">
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
        <div className="flex flex-col flex-1 pb-4 pt-12 gap-4 overflow-hidden">
            <div className="flex flex-col justify-center items-center">
                <Observer>
                    {() => {
                        let Icon;
                        let iconClassName;
                        let buttonDisabled = false;
                        if (store.aiState.isLoading) {
                            Icon = Loader;
                            iconClassName = clsx(styles.micButton, "animate-spin");
                            buttonDisabled = true;
                        } else if (store.isSttActive) {
                            Icon = MicOff;
                            iconClassName = clsx(styles.micButton, styles.listening);
                        } else {
                            Icon = Mic;
                            iconClassName = styles.micButton;
                        }
                        return (
                            <>
                                <button
                                    className={iconClassName}
                                    onClick={() => store.isSttActive ? store.stopListening() : store.startListening()}
                                    disabled={buttonDisabled}
                                    aria-label={store.isSttActive ? "Stop listening" : "Start listening"}
                                >
                                    <Icon size={24} />
                                </button>
                                <div className="text-base-m text-secondary mt-4">
                                    {store.aiState.isLoading
                                        ? "Transcribing..."
                                        : store.isSttActive
                                            ? "Listening..."
                                            : "Click to start listening"}
                                </div>
                            </>
                        );
                    }}
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
        <div ref={containerRef} className="flex-1 overflow-auto px-6">
            <Observer>
                {() => <ContentView content={store.content} />}
            </Observer>
            <Observer>
                {() => (
                    <div
                        className={`text-base-m text-secondary mt-2${store.content.isEmpty ? " text-center" : ""}`}
                    >
                        {store.liveTranscription}
                    </div>
                )}
            </Observer>
        </div>
    );
}



function ContentView(props: { content: Content }) {
    const store = useAiSTTDialogStore();
    if (props.content.isEmpty) return null;
    return (
        <div className="text-base-m text-default space-y-2">
            {props.content.paragraphs.map((paragraph) => {
                const html = ContentsToHtmlService.convertParagraph(paragraph);
                return (
                    <div
                        key={paragraph.uuid}
                        className="group relative hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    >
                        <p
                            dangerouslySetInnerHTML={{ __html: html }}
                            className="pr-6"
                        />
                        <button
                            type="button"
                            onClick={() => store.removeParagraph(paragraph)}
                            className=" cursor-pointer text-red-500 hover:text-red-700 absolute top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-white/80 hover:bg-white shadow-md"
                            aria-label="Delete paragraph"
                        >
                            <X size={16} strokeWidth={2.2} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}




function DialogFooter() {
    const store = useAiSTTDialogStore();

    return (
        <Observer>
            {() => (
                <div className="flex flex-row gap-2 px-4 py-3 items-center justify-between">
                    {store.allowAi ? (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="enable-ai"
                                checked={store.enableAi}
                                onChange={() => store.toggleEnableAi()}
                                className="mr-2"
                            />
                            <label htmlFor="enable-ai" className="text-base-m text-default select-none">
                                Enable AI
                            </label>
                        </div>
                    ) : (
                        <div />
                    )}
                    <div className="flex justify-end gap-2">
                        <OutlinedButton onClick={() => store.onClickCancel()}>
                            Cancel
                        </OutlinedButton>
                        <FilledButton onClick={() => store.onClickDone()}>
                            Done
                        </FilledButton>
                    </div>
                </div>
            )}
        </Observer>
    );
}

