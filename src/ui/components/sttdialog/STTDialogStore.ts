import { makeObservable, observable, runInAction } from "mobx";
import { logger } from "~/core/utils/logger";
import { STT, STTError, STTErrorCode } from "~/infra/utils/stt/STT";

export class STTDialogStore {
    fullText: string = "";
    transcription: string = "";
    isListening: boolean = false;
    stt: STT;
    sttError: STTError | null = null;

    constructor({ stt }: { stt: STT }) {
        this.stt = stt;
        makeObservable(this, {
            transcription: observable,
            isListening: observable,
            sttError: observable,
        });
        this.addListeners();
    }

    onStart = () => {
        runInAction(() => {
            this.isListening = true;
        });
    };

    onEnd = () => {
        runInAction(() => {
            this.isListening = false;
        });
    };

    onResult = (result: string) => {
        runInAction(() => {
            this.fullText = result;
            this.transcription = result;
        });
    };

    onPartialResult = (result: string) => {
        runInAction(() => {
            if (this.fullText.length > 0) {
                this.transcription = this.fullText + " " + result;
            } else {
                this.transcription = result;
            }
        });
    };

    onError = (error: STTError) => {
        logger.error("STT Error", error);
        runInAction(() => {
            this.sttError = error;
        });
    };

    start = () => {
        try {
            this.stt.start();
        }
        catch (error) {
            if (error instanceof STTError) {
                runInAction(() => {
                    this.sttError = error;
                });
            }
            else {
                runInAction(() => {
                    this.sttError = new STTError(STTErrorCode.GENERAL_ERROR, "An unknown error occurred");
                });
            }
        }
    };

    stop = () => {
        this.stt.stop();
    };

    abort = () => {
        this.stt.abort();
    };

    addListeners() {
        this.stt.onStart(this.onStart);
        this.stt.onEnd(this.onEnd);
        this.stt.onResult(this.onResult);
        this.stt.onPartialResult(this.onPartialResult);
        this.stt.onError(this.onError);
    }

    removeListeners() {
        this.stt.offStart?.(this.onStart);
        this.stt.offEnd?.(this.onEnd);
        this.stt.offResult?.(this.onResult);
        this.stt.offPartialResult?.(this.onPartialResult);
        this.stt.offError?.(this.onError);
    }

    dispose() {
        this.removeListeners();
        this.stt.abort();
    }
}
