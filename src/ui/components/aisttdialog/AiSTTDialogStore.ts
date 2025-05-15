import { computed, makeObservable, observable, runInAction } from "mobx";
import { STT, STTError } from "~/infra/utils/stt/STT";
import { AiSTTReq } from "~/domain/aistt/models/AiSTTModels";
import { logger } from "~/core/utils/logger";
import { STTDataState } from "../../utils/STTDataState";
import { DataState } from "~/ui/utils/DataState";
import { AiSTTService } from "~/domain/aistt/services/AiSTTService";
import { Content } from "~/domain/aistt/models/Content";
import { AppError } from "~/core/error/AppError";
import { Paragraph } from "~/domain/aistt/models/Paragraph";
import { TextRun } from "~/domain/aistt/models/TextRun";
import { OS } from "~/infra/utils/deviceinfo/DeviceInfo";
import { DeviceInfoUtil } from "~/infra/utils/deviceinfo/DeviceInfoUtil";

export class AiSTTDialogStore {

    // Dependencies
    private _stt: STT;
    private _aiService: AiSTTService;
    private _onDone: (content: Content) => void;
    private _onCancel: () => void;
    public enableAi: boolean;
    public allowAi: boolean;

    // Observable State Variables
    public content = Content.empty();
    public sttState = STTDataState.init();
    public processingState = DataState.init<undefined>();
    public transcriptionBuffer: string = "";
    public liveTranscription: string = "";

    // Non Observable State Variables
    public isAttemptingDone: boolean = false;
    public currentProcessingTranscription: string = "";

    // Computed Variables
    public supportsContinuousSpeechInput: boolean;

    constructor({
        stt,
        aiService,
        onDone,
        onCancel,
        enableAi,
        allowAi,
    }: {
        stt: STT;
        aiService: AiSTTService;
        onDone: (content: Content) => void;
        onCancel: () => void;
        enableAi: boolean;
        allowAi: boolean;
    }) {
        this._stt = stt;
        this._aiService = aiService;
        this.enableAi = enableAi;
        this.allowAi = allowAi;
        this._onDone = onDone;
        this._onCancel = onCancel;

        // Check if the device supports continuous speech input
        const deviceInfo = DeviceInfoUtil.getDeviceInfo();
        if (deviceInfo.os === OS.Android) {
            this.supportsContinuousSpeechInput = false;
        }
        else {
            this.supportsContinuousSpeechInput = true;
        }


        makeObservable(this, {
            sttState: observable,
            processingState: observable,
            content: observable,
            enableAi: observable,
            transcriptionBuffer: observable,
            liveTranscription: observable,
            isAttemptingDone: observable,
            isSttActive: computed,
            isSomethingInProgress: computed,
            isDoneButtonEnabled: computed,
        });
    }

    public get isSttActive() {
        return this.sttState.isListening;
    }

    toggleEnableAi() {
        runInAction(() => {
            this.enableAi = !this.enableAi;
        });
    }

    public get isSomethingInProgress() {
        if (this.sttState.isActive) {
            return true;
        }
        if (this.processingState.isLoading) {
            return true;
        }
        return false;
    }

    onClickMainButton() {
        logger.debug("onClickMainButton");
        if (this.processingState.isLoading) {
            // Ignore silently
            logger.debug("onClickMainButton: processing is loading");
            return;
        }
        if (this.sttState.isListening) {
            // Stop STT
            logger.debug("onClickMainButton: stopping stt");
            runInAction(() => {
                this.sttState = STTDataState.waitingToEnd();
            });
            this._stt.stop();
        }
        else if (!this.sttState.isWaiting) {
            // If not waiting for any action, start STT
            logger.debug("onClickMainButton: starting stt");
            this.isAttemptingDone = false; // Reset the flag: Since explicitly starting the STT
            runInAction(() => {
                this.sttState = STTDataState.waitingToStart();
            });
            this._stt.start();
        }
        // Ignore rest of the cases
    }

    private onSTTStart = () => {
        logger.debug("STT started");
        runInAction(() => {
            this.transcriptionBuffer = this.liveTranscription = "";
            this.sttState = STTDataState.listening();
        });
    }

    private onEnd = () => {
        logger.debug("STT stopped");
        runInAction(() => {
            const trimmed = this.transcriptionBuffer.trim();
            if (!trimmed) {
                this.liveTranscription = this.transcriptionBuffer = "";
                this.sttState = STTDataState.init();
                return;
            }
            this.sttState = STTDataState.init();
            this.startProcessing(trimmed);
        });
    }

    private onSTTError = (error: STTError) => {
        logger.debug("STT error", error);
        runInAction(() => {
            this.sttState = STTDataState.error(error);
        });
    }

    onResult = (result: string) => {
        logger.debug("STT result", result);
        runInAction(() => {
            this.liveTranscription = this.transcriptionBuffer = result;
        });
    };

    onPartialResult = (result: string) => {
        logger.debug("STT partial result", result);
        runInAction(() => {
            if (this.transcriptionBuffer.length > 0) {
                this.liveTranscription = this.transcriptionBuffer + " " + result;
            } else {
                this.liveTranscription = result;
            }
        });
    };

    public addSTTListeners() {
        this._stt.onStart(this.onSTTStart);
        this._stt.onEnd(this.onEnd);
        this._stt.onError(this.onSTTError);
        this._stt.onResult(this.onResult);
        this._stt.onPartialResult(this.onPartialResult);
    }

    private removeListeners() {
        this._stt.offStart(this.onSTTStart);
        this._stt.offEnd(this.onEnd);
        this._stt.offError(this.onSTTError);
        this._stt.offResult(this.onResult);
        this._stt.offPartialResult(this.onPartialResult);
    }


    public async startAiTranscription() {
        try {
            runInAction(() => {
                this.processingState = DataState.loading();
            });
            const aiReq = new AiSTTReq({
                previousContext: this.content.toMarkdown(),
                transcription: this.currentProcessingTranscription,
            });
            const data = (await this._aiService.generateResponse(aiReq)).getOrError();
            runInAction(() => {
                this.content = data.content;
                this.processingState = DataState.data(undefined);
                this.transcriptionBuffer = "";
                this.liveTranscription = "";
            });
            if (this.isAttemptingDone) {
                this.returnCurrentResult();
            }
        }
        catch (error) {
            logger.error("Error in AiSTTDialogStore", error);
            const aiError = AppError.fromAny(error);
            runInAction(() => {
                this.processingState = DataState.error(aiError);
            });
        }
        finally {
            this.isAttemptingDone = false;
        }
    }

    onClickCancelProcessing(): void {
        logger.debug("onClickCancelProcessing");
        runInAction(() => {
            this.currentProcessingTranscription = "";
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
            this.processingState = DataState.init();
        });
    }

    async startProcessing(text: string) {
        this.currentProcessingTranscription = text;
        if (this.enableAi) {
            await this.startAiTranscription();
        }
        else {
            await this.addParagraphToContent();
        }
        this.currentProcessingTranscription = "";
    }


    returnCurrentResult() {
        if (this.content.isEmpty) {
            this._onCancel();
        }
        else {
            this._onDone(this.content);
        }
        this.resetState();
    }


    public clearAiTranscription() {
        runInAction(() => {
            this.content = Content.empty();
            this.processingState = DataState.init();
        });
    }

    dispose() {
        this._stt.abort();
        this.removeListeners();
        this.resetState();
    }

    resetState() {
        runInAction(() => {
            this.sttState = STTDataState.init();
            this.processingState = DataState.init();
            this.content = Content.empty();
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
            this.isAttemptingDone = false;
            this.currentProcessingTranscription = "";
        });
    }

    public onClickCancel() {
        runInAction(() => {
            this.sttState = STTDataState.waitingToEnd();
        });
        this._stt.abort();
        this.resetState();
        this._onCancel();
    }

    public get isDoneButtonEnabled() {
        return this.sttState.isListening || !this.processingState.isLoading;
    }


    public onClickDone() {
        if (this.sttState.isListening) {
            this.isAttemptingDone = true;
            runInAction(() => {
                this.sttState = STTDataState.waitingToEnd();
            });
            this._stt.stop();
        }
        else if (this.processingState.isLoading) {
            this.isAttemptingDone = true;
        }
        else {
            this.returnCurrentResult();
        }
    }

    public onClickReset() {
        this._stt.abort();
        runInAction(() => {
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
            this.content = Content.empty();
            this.sttState = STTDataState.init();
            this.processingState = DataState.init();
        });
    }


    async addParagraphToContent() {
        runInAction(() => {
            this.processingState = DataState.loading();
        });
        const newContent = this.getNewContent(this.currentProcessingTranscription);
        runInAction(() => {
            this.content = newContent;
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
            this.processingState = DataState.data(undefined);
        });
        if (this.isAttemptingDone) {
            this.returnCurrentResult();
        }
        this.isAttemptingDone = false;
    }

    getNewContent(text: string): Content {
        const lastParagraph = this.content.paragraphs.length > 0 ? this.content.paragraphs[this.content.paragraphs.length - 1] : null;
        if (lastParagraph) {
            const lastRun = lastParagraph.runs.length > 0 ? lastParagraph.runs[lastParagraph.runs.length - 1] : null;
            const newRun = TextRun.fromText(text);
            let updatedParagraphs;
            if (lastRun) {
                // Create a new run with updated content
                const updatedRun = new TextRun({ ...lastRun, content: lastRun.content + " " + newRun.content });
                // Replace the last run in the paragraph
                const updatedRuns = [...lastParagraph.runs.slice(0, -1), updatedRun];
                const updatedParagraph = new Paragraph({ ...lastParagraph, runs: updatedRuns });
                updatedParagraphs = [...this.content.paragraphs.slice(0, -1), updatedParagraph];
            } else {
                // Add new run to the last paragraph
                const updatedRuns = [...lastParagraph.runs, newRun];
                const updatedParagraph = new Paragraph({ ...lastParagraph, runs: updatedRuns });
                updatedParagraphs = [...this.content.paragraphs.slice(0, -1), updatedParagraph];
            }
            return new Content({ paragraphs: updatedParagraphs });
        }
        else {
            const newParagraph = Paragraph.fromText(text);
            return new Content({ paragraphs: [...this.content.paragraphs, newParagraph] });
        }
    }




    removeParagraph(paragraph: Paragraph): void {
        const idx = this.content.paragraphs.findIndex(p => p.uuid === paragraph.uuid);
        if (idx === -1) return;
        runInAction(() => {
            this.content = new Content({
                paragraphs: [
                    ...this.content.paragraphs.slice(0, idx),
                    ...this.content.paragraphs.slice(idx + 1)
                ]
            });
        });
    }


}