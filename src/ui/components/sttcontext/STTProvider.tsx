import React, { useRef } from "react";
import { STT } from "~/infra/utils/stt/STT";
import { STTContext } from "./STTContext";

type STTProviderProps = {
    children: React.ReactNode;
};

export const STTProvider: React.FC<STTProviderProps> = ({ children }) => {
    const stt = useRef<STT>(new STT());
    return (
        <STTContext.Provider value={stt.current} >
            {children}
        </STTContext.Provider>
    );
};