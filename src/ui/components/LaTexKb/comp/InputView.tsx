import React, { useEffect, useRef, useState } from "react";

import type { MathfieldElement } from "mathlive";
import "mathlive";
import styles from "./../style.module.css";
import { useCallback } from "react";
import type { STT } from "~/infra/utils/stt/STT";
import { useDialogManager, type DialogEntry } from "~/ui/widgets/dialogmanager";
import { Mic } from "lucide-react";
import { STTLaTexDialog, STTLaTexDialogProps } from "../../sttlatexdialog/STTLaTexDialog";

type InputViewProps = {
    stt: STT;
    onReady: (mf: MathfieldElement) => void;
};

function InputViewComponent({ stt, onReady }: InputViewProps) {
    const [isDefined, setIsDefined] = useState(false);
    const mfRef = useRef<MathfieldElement | null>(null);
    const hasCalledReady = useRef(false);

    useEffect(() => {
        const defineMathField = async () => {
            await window.customElements.whenDefined("math-field");
            (window as any).MathfieldElement.fontsDirectory = "/packages/mathlive/fonts";
            (window as any).MathfieldElement.soundsDirectory = "/packages/mathlive/sounds";
            setIsDefined(true);
        };
        defineMathField();
    }, []);

    useEffect(() => {
        if (isDefined && mfRef.current && !hasCalledReady.current) {
            onReady(mfRef.current);
            mfRef.current.mathVirtualKeyboardPolicy = "manual";
            hasCalledReady.current = true;
        }
    }, [isDefined, onReady]);

    if (!isDefined) {
        return <div className={styles.inputContainer}></div>;
    }

    return (
        <div className={styles.inputContainer}>
            <math-field
                placeholder="\text{Enter a formula}"
                className={styles.input}
                ref={mfRef}
            ></math-field>
            <LaTexKbListenButton stt={stt} onResult={(transcription) => { if (mfRef.current) { mfRef.current.value = transcription; } }} />
        </div>
    );
}

export const InputView = React.memo(InputViewComponent);



type LaTexKbListenButtonProps = {
    stt: STT;
    onResult: (transaction: string) => void;
};

export function LaTexKbListenButton({ stt, onResult }: LaTexKbListenButtonProps) {
    const dialogManager = useDialogManager();

    const openVoiceDialog = useCallback(() => {
        const dialogEntry: DialogEntry<STTLaTexDialogProps> = {
            id: "voice-input-dialog",
            component: STTLaTexDialog,
            props: {
                stt,
                onClose: (result: string) => {
                    onResult(result);
                    dialogManager.pop();
                }
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
