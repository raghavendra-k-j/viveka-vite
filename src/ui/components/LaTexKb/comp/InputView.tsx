import React, { useEffect, useRef, useState } from "react";

import type { MathfieldElement } from "mathlive";
import "mathlive";
import styles from "./../style.module.css";

type InputViewProps = {
    onReady: (mf: MathfieldElement) => void;
};

function InputViewComponent({ onReady }: InputViewProps) {
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
        </div>
    );
}

export const InputView = React.memo(InputViewComponent);