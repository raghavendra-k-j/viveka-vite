import { makeObservable, observable, runInAction } from "mobx";
import { logger } from "~/core/utils/logger";
import { AiLaTexService } from "~/domain/latexkb/services/AiLaTexService";
import { STT, STTError, STTErrorCode } from "~/infra/utils/stt/STT";

export class STTLaTexDialogStore {
    fullText: string = "";
    transcription: string = "";
    isListening: boolean = false;
    stt: STT;
    sttError: STTError | null = null;
    aiLaTextService: AiLaTexService;


    constructor({ stt }: { stt: STT }) {
        this.stt = stt;
        this.aiLaTextService = new AiLaTexService();
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


    onClickRestart = () => {
        if (this.isListening) {
            this.stop();
        }
        this.transcription = "";
        this.fullText = "";
        this.sttError = null;
        this.start();
    }


    generateLaTex = async () => {
        this.stop();
        const userInput = this.transcription;
        const trimmedUserInput = userInput.trim();
        if (trimmedUserInput.length === 0) {
            return;
        }
        try {
            const result = await this.aiLaTextService.generateLaTex(userInput);
            if (result) {
                return result;
            }
            else {
                this.sttError = new STTError(STTErrorCode.GENERAL_ERROR, "Failed to generate LaTeX");
            }
        } catch (error) {
            logger.error("Error generating LaTeX", error);
            this.sttError = new STTError(STTErrorCode.GENERAL_ERROR, "An error occurred while generating LaTeX");
        }
    }

}
