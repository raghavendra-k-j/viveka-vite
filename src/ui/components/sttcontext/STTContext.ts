import { createContext, useContext } from "react";
import { STT } from "~/infra/utils/stt/STT";

export const STTContext = createContext<STT | null>(null);

export const useStt = () => {
    const context = useContext(STTContext);
    if (!context) {
        throw new Error("useStt must be used within a STTContext provider");
    }
    return context;
}