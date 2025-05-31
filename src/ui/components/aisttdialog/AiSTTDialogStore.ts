import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { STT, STTError } from "~/infra/utils/stt/STT";
import { AiSTTReq } from "~/domain/aistt/models/AiSTTModels";
import { logger } from "~/core/utils/logger";
import { STTDataState } from "../../utils/STTDataState";
import { DataState } from "~/ui/utils/DataState";
import { AiSTTService } from "~/domain/aistt/services/AiSTTService";
import { AppError } from "~/core/error/AppError";
import { OS } from "~/infra/utils/deviceinfo/DeviceInfo";
import { DeviceInfoUtil } from "~/infra/utils/deviceinfo/DeviceInfoUtil";
import { AiSTTContent, AiSTTContentType, AiSTTLatextContent, AiSTTParaListContent, Paragraph, TextRun } from "~/domain/aistt/models/AiSTTContent";

export type ParaListContentTypeProps = {
    enableAi: boolean;
    allowAi: boolean;
}

export type LaTextContentTypeProps = {

}

export type ContentTypeOptions = ParaListContentTypeProps | LaTextContentTypeProps;


export type AiSTTDialogStoreProps = {
    contentType: AiSTTContentType;
    contentTypeProps: ContentTypeOptions;
    stt: STT;
    aiService: AiSTTService;
    onDone: (content: AiSTTContent) => void;
    onCancel: () => void;
}


export class AiSTTDialogStore {

    // Dependencies
    private _stt: STT;
    private _aiService: AiSTTService;
    private _onDone: (content: AiSTTContent) => void;
    private _onCancel: () => void;
    public contentType: AiSTTContentType;
    public contentTypeProps: ContentTypeOptions;

    // Observable State Variables
    public content: AiSTTContent;
    public sttState = STTDataState.init();
    public processingState = DataState.init<undefined>();
    public transcriptionBuffer: string = "";
    public liveTranscription: string = "";

    // Non Observable State Variables
    public isAttemptingDone: boolean = false;
    public currentProcessingTranscription: string = "";

    // Computed Variables
    public supportsContinuousSpeechInput: boolean;
    public _allowAi: boolean = false;
    public _enableAi: boolean = false;

    constructor(props: AiSTTDialogStoreProps) {
        this._stt = props.stt;
        this._aiService = props.aiService;

        this.contentType = props.contentType;
        if (this.contentType === AiSTTContentType.PARA_LIST) {
            this.contentTypeProps = props.contentTypeProps as ParaListContentTypeProps;
            this.content = AiSTTParaListContent.newEmpty();
            this._allowAi = (this.contentTypeProps as ParaListContentTypeProps).allowAi;
            this._enableAi = (this.contentTypeProps as ParaListContentTypeProps).enableAi;
        }
        else if (this.contentType === AiSTTContentType.LATEX) {
            this.contentTypeProps = props.contentTypeProps as LaTextContentTypeProps;
            this.content = AiSTTParaListContent.newEmpty();
            this._enableAi = true; // LaTeX content type always has AI enabled
        }
        else {
            throw new Error("Unsupported content type: " + this.contentType);
        }

        this._onDone = props.onDone;
        this._onCancel = props.onCancel;

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
            enableAi: computed,
            allowAi: computed,
            _allowAi: observable,
            _enableAi: observable,
            transcriptionBuffer: observable,
            liveTranscription: observable,
            isAttemptingDone: observable,
            isSttActive: computed,
            isSomethingInProgress: computed,
            isDoneButtonEnabled: computed,
            toggleEnableAi: action,
            clearAiTranscription: action,
        });
    }


    get allowAi(): boolean {
        return this._allowAi;
    }

    get enableAi(): boolean {
        return this._enableAi;
    }

    public get isSttActive() {
        return this.sttState.isListening;
    }

    toggleEnableAi() {
        this._enableAi = !this._enableAi;
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
        if (this.processingState.isLoading) {
            return;
        }
        if (this.sttState.isListening) {
            runInAction(() => {
                this.sttState = STTDataState.waitingToEnd();
            });
            this._stt.stop();
        }
        else if (!this.sttState.isWaiting) {
            this.isAttemptingDone = false; // Reset the flag: Since explicitly starting the STT
            runInAction(() => {
                this.sttState = STTDataState.waitingToStart();
            });
            this._stt.start();
        }
        // Ignore rest of the cases
    }

    private onSTTStart = () => {
        runInAction(() => {
            this.transcriptionBuffer = this.liveTranscription = "";
            this.sttState = STTDataState.listening();
        });
    }

    private onEnd = () => {
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



    private getPreviousContext(): string {
        if (this.contentType === AiSTTContentType.PARA_LIST) {
            return (this.content as AiSTTParaListContent).toMarkdown();
        }
        if (this.contentType === AiSTTContentType.LATEX) {
            return "";
        }
        throw new Error("Unsupported content type: " + this.contentType);
    }


    public async startAiTranscription() {
        try {
            runInAction(() => {
                this.processingState = DataState.loading();
            });
            const aiReq = new AiSTTReq({
                contentType: this.contentType,
                previousContext: this.getPreviousContext(),
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
        this.content = this.newEmptyContent();
        this.processingState = DataState.init();
    }

    dispose() {
        this._stt.abort();
        this.removeListeners();
        this.resetState();
    }


    private newEmptyContent(): AiSTTContent {
        if (this.contentType === AiSTTContentType.PARA_LIST) {
            return AiSTTParaListContent.newEmpty();
        }
        if (this.contentType === AiSTTContentType.LATEX) {
            return AiSTTParaListContent.newEmpty();
        }
        throw new Error("Unsupported content type: " + this.contentType);
    }


    resetState() {
        runInAction(() => {
            this.sttState = STTDataState.init();
            this.processingState = DataState.init();
            this.content = this.newEmptyContent();
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
            this.content = this.newEmptyContent();
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

    getNewContent(text: string): AiSTTContent {
        const paraListContent = this.content as AiSTTParaListContent;
        const lastParagraph = paraListContent.paragraphs.length > 0 ? paraListContent.paragraphs[paraListContent.paragraphs.length - 1] : null;
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
                updatedParagraphs = [...paraListContent.paragraphs.slice(0, -1), updatedParagraph];
            }
            else {
                // Add new run to the last paragraph
                const updatedRuns = [...lastParagraph.runs, newRun];
                const updatedParagraph = new Paragraph({ ...lastParagraph, runs: updatedRuns });
                updatedParagraphs = [...paraListContent.paragraphs.slice(0, -1), updatedParagraph];
            }
            return new AiSTTParaListContent(updatedParagraphs);
        }
        else {
            const newParagraph = Paragraph.fromText(text);
            return new AiSTTParaListContent([...paraListContent.paragraphs, newParagraph]);
        }
    }



    removeParagraph(paragraph: Paragraph): void {
        const idx = (this.content as AiSTTParaListContent).paragraphs.findIndex(p => p.uuid === paragraph.uuid);
        if (idx === -1) return;
        runInAction(() => {
            const paraContent = this.content as AiSTTParaListContent;
            this.content = new AiSTTParaListContent([
                ...paraContent.paragraphs.slice(0, idx),
                ...paraContent.paragraphs.slice(idx + 1)
            ]);
        });
    }


}