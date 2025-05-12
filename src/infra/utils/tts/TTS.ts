type SpeechVoice = SpeechSynthesisVoice;

interface TTSOptions {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechVoice;
}

type TTSListener = (tag?: string | null) => void;

export class TTS {
    private synth: SpeechSynthesis;
    private currentTag: string | null = null;
    private _isSpeaking = false;

    private startListeners = new Set<TTSListener>();
    private stopListeners = new Set<TTSListener>();
    private languageVoiceMap = new Map<string, SpeechVoice[]>();

    constructor() {
        this.synth = window.speechSynthesis;
        this.initializeVoices();
    }

    private initializeVoices(): void {
        const voices = this.synth.getVoices();
        if (voices.length > 0) {
            this.mapVoicesByLanguage(voices);
        } else {
            const handler = () => {
                const loadedVoices = this.synth.getVoices();
                this.mapVoicesByLanguage(loadedVoices);
                this.synth.removeEventListener("voiceschanged", handler);
            };
            this.synth.addEventListener("voiceschanged", handler);
        }
    }

    private mapVoicesByLanguage(voices: SpeechVoice[]): void {
        this.languageVoiceMap.clear();
        for (const voice of voices) {
            const lang = voice.lang;
            if (!this.languageVoiceMap.has(lang)) {
                this.languageVoiceMap.set(lang, []);
            }
            this.languageVoiceMap.get(lang)!.push(voice);
        }
    }

    async waitForVoices(): Promise<SpeechVoice[]> {
        const voices = this.synth.getVoices();
        if (voices.length > 0) return voices;

        return new Promise(resolve => {
            const handler = () => {
                this.synth.removeEventListener("voiceschanged", handler);
                const loaded = this.synth.getVoices();
                this.mapVoicesByLanguage(loaded);
                resolve(loaded);
            };
            this.synth.addEventListener("voiceschanged", handler);
        });
    }

    get voices(): SpeechVoice[] {
        return this.synth.getVoices();
    }

    get supportedLanguages(): string[] {
        return Array.from(this.languageVoiceMap.keys());
    }

    getAvailableVoicesForLanguage(lang: string): SpeechVoice[] {
        return this.languageVoiceMap.get(lang) ?? [];
    }

    isLangSupported(lang: string): boolean {
        return this.languageVoiceMap.has(lang);
    }

    get isSpeaking(): boolean {
        return this._isSpeaking;
    }

    get currentSpeechTag(): string | null {
        return this.currentTag;
    }


    onStart(listener: TTSListener): void {
        this.startListeners.add(listener);
    }

    offStart(listener: TTSListener): void {
        this.startListeners.delete(listener);
    }

    onStop(listener: TTSListener): void {
        this.stopListeners.add(listener);
    }

    offStop(listener: TTSListener): void {
        this.stopListeners.delete(listener);
    }

    clearAllListeners(): void {
        this.startListeners.clear();
        this.stopListeners.clear();
    }

    private emitStart(): void {
        this.startListeners.forEach(listener => listener(this.currentTag));
    }

    private emitStop(): void {
        this.stopListeners.forEach(listener => listener(this.currentTag));
    }

    speak({ text, options = {}, tag }: { text: string; options?: TTSOptions; tag?: string }): void {
        this.stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate ?? 1;
        utterance.pitch = options.pitch ?? 1;
        utterance.volume = options.volume ?? 1;
        utterance.voice = options.voice ?? this.voices[0] ?? null;

        this.currentTag = tag ?? null;

        utterance.onstart = () => {
            this._isSpeaking = true;
            this.emitStart();
        };

        utterance.onend = () => {
            this._isSpeaking = false;
            this.emitStop();
            this.currentTag = null;
        };

        utterance.onerror = () => {
            this._isSpeaking = false;
            this.emitStop();
            this.currentTag = null;
        };

        this.synth.speak(utterance);
    }

    stop(): void {
        if (this._isSpeaking || this.synth.speaking) {
            this.synth.cancel();
            this._isSpeaking = false;
            this.emitStop();
            this.currentTag = null;
        }
    }

    pause(): void {
        if (this.synth.speaking && !this.synth.paused) {
            this.synth.pause();
        } else if (this.synth.paused) {
            this.synth.resume();
        }
    }
}
