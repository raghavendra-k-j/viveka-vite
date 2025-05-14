import { makeObservable, observable, runInAction } from "mobx";
import { logger } from "~/core/utils/logger";
import { STT, STTError, STTErrorCode } from "~/infra/utils/stt/STT";

export class STTDialogStore {
    transcriptionBuffer: string = "";
    liveTranscription: string = "";
    isListening: boolean = false;
    stt: STT;
    sttError: STTError | null = null;

    constructor({ stt }: { stt: STT }) {
        this.stt = stt;
        makeObservable(this, {
            liveTranscription: observable,
            isListening: observable,
            sttError: observable,
        });
        this.addListeners();
    }

    onStart = () => {
        runInAction(() => {
            this.isListening = true;
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
        });
    };

    onEnd = () => {
        runInAction(() => {
            this.isListening = false;
            this.transcriptionBuffer = "";
        });
    };

    onResult = (result: string) => {
        runInAction(() => {
            this.liveTranscription = this.transcriptionBuffer = result;
        });
    };

    onPartialResult = (result: string) => {
        runInAction(() => {
            if (this.transcriptionBuffer.length > 0) {
                this.liveTranscription = this.transcriptionBuffer + " " + result;
            } else {
                this.liveTranscription = result;
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
            this.handleSTTStartError(error);
        }
    };

    private handleSTTStartError(error: unknown) {
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

    onClickRestart = () => {
        if (this.isListening) {
            this.stop();
        }
        this.liveTranscription = "";
        this.transcriptionBuffer = "";
        this.sttError = null;
        this.start();
    }

}
