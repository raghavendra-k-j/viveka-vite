import { computed, makeObservable, observable, runInAction } from "mobx";
import { STT, STTError } from "~/infra/utils/stt/STT";
import { AiSTTReq } from "~/domain/aistt/models/AiSTTModels";
import { logger } from "~/core/utils/logger";
import { STTDataState } from "../../utils/STTDataState";
import { DataState } from "~/ui/utils/DataState";
import { AiSTTServiceOpenAI } from "~/domain/aistt/services/AiOpenAiSTTService";
import { Content } from "~/domain/aistt/models/Content";
import { AppError } from "~/core/error/AppError";
import { Paragraph } from "~/domain/aistt/models/Paragraph";
import { TextRun } from "~/domain/aistt/models/TextRun";

export class AiSTTDialogStore {


    private _stt: STT;
    private _aiService: AiSTTServiceOpenAI;
    private _onDone: (content: Content) => void;
    private _onCancel: () => void;
    public enableAi: boolean;
    public allowAi: boolean;

    public content = Content.empty();
    public sttState = STTDataState.init();
    public aiState = DataState.init<undefined>();

    public transcriptionBuffer: string = "";
    public liveTranscription: string = "";


    constructor({
        stt,
        aiService,
        onDone,
        onCancel,
        enableAi,
        allowAi,
    }: {
        stt: STT;
        aiService: AiSTTServiceOpenAI;
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
        this.addSTTListeners();
        makeObservable(this, {
            sttState: observable,
            aiState: observable,
            content: observable,
            enableAi: observable,
            transcriptionBuffer: observable,
            liveTranscription: observable,
            isSttActive: computed,
        });
    }

    public get isSttActive() {
        return this.sttState.isListening;
    }

    toggleEnableAi(): void {
        runInAction(() => {
            this.enableAi = !this.enableAi;
        });
    }



    public async startListening() {
        logger.debug("Start listening");
        if (this._stt.isRecognizing()) {
            this.abortListening();
        }
        await this._stt.start();
    }

    public stopListening() {
        logger.debug("Stop listening");
        this._stt.stop();
    }

    public abortListening() {
        logger.debug("Abort listening");
        this._stt.abort();
    }

    private onSTTStart = () => {
        logger.debug("STT started");
        runInAction(() => {
            this.sttState = STTDataState.listening();
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
        });
    }

    private onEnd = () => {
        logger.debug("STT stopped");
        runInAction(() => {
            runInAction(() => {
                this.sttState = STTDataState.init();
            });
            const trimmed = this.transcriptionBuffer.trim();
            if (!trimmed) {
                this.liveTranscription = "";
                this.transcriptionBuffer = "";
                this.sttState = STTDataState.init();
                return;
            }
            if (this.enableAi) {
                this.startAiTranscription(trimmed);
            }
            else {
                this.addParagraphToContent(trimmed);
            }
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

    private addSTTListeners() {
        this._stt.onStart(this.onSTTStart);
        this._stt.onEnd(this.onEnd);
        this._stt.onError(this.onSTTError);
        this._stt.onResult(this.onResult);
        this._stt.onPartialResult(this.onPartialResult);
    }

    private removeListener() {
        this._stt.offStart(this.onSTTStart);
        this._stt.offEnd(this.onEnd);
        this._stt.offError(this.onSTTError);
        this._stt.offResult(this.onResult);
        this._stt.offPartialResult(this.onPartialResult);
    }


    public async startAiTranscription(text: string) {
        try {
            runInAction(() => {
                this.aiState = DataState.loading();
            });
            const aiReq = new AiSTTReq({
                previousContext: this.content.toMarkdown(),
                transcription: text,
            });
            const data = (await this._aiService.generateResponse(aiReq)).getOrError();
            runInAction(() => {
                this.content = data.content;
                this.aiState = DataState.data(undefined);
                this.transcriptionBuffer = "";
                this.liveTranscription = "";
            });
        }
        catch (error) {
            logger.error("Error in AiSTTDialogStore", error);
            const aiError = AppError.fromAny(error);
            runInAction(() => {
                this.aiState = DataState.error(aiError);
            });
        }
    }

    public clearAiTranscription() {
        runInAction(() => {
            this.content = Content.empty();
            this.aiState = DataState.init();
        });
    }

    dispose() {
        this._stt.abort();
        this.removeListener();
    }


    public onClickCancel() {
        this._onCancel();
    }

    public onClickDone() {
        if (this.content) {
            this._onDone(this.content);
        } else {
            this._onCancel();
        }
    }

    public onClickReset() {
        this._stt.abort();
        runInAction(() => {
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
            this.content = Content.empty();
            this.sttState = STTDataState.init();
            this.aiState = DataState.init();
        });
    }


    addParagraphToContent(text: string) {
        runInAction(() => {
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
                this.content = new Content({ paragraphs: updatedParagraphs });
            }
            else {
                const newParagraph = Paragraph.fromText(text);
                this.content = new Content({ paragraphs: [...this.content.paragraphs, newParagraph] });
            }
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
        });
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