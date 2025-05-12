import { TTS } from "./TTS";

let _instance: TTS | null = null;


export const getTTS = (): TTS | null => {
    if (_instance) return _instance;
    if (typeof window === 'undefined') return null;
    _instance = new TTS();
    return _instance;
};
