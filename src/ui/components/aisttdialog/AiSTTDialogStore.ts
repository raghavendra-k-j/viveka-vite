import { makeObservable, observable, runInAction } from "mobx";
import { STT, STTError } from "~/infra/utils/stt/STT";
import { AiSTTReq } from "~/domain/aistt/models/AiSTTModels";
import { logger } from "~/core/utils/logger";
import { STTDataState } from "../../utils/STTDataState";
import { DataState } from "~/ui/utils/DataState";
import { AiSTTServiceOpenAI } from "~/domain/aistt/services/AiOpenAiSTTService";
import { Content } from "~/domain/aistt/models/Content";
import { AppError } from "~/core/error/AppError";
import { Paragraph } from "~/domain/aistt/models/Paragraph";

export class AiSTTDialogStore {

    private _stt: STT;
    private _aiService: AiSTTServiceOpenAI;
    private _onDone: (content: Content) => void;
    private _onCancel: () => void;
    private _aiEnabled: boolean = false;

    public content?: Content;
    public sttState = STTDataState.init();
    public aiState = DataState.init<undefined>();

    public transcriptionBuffer: string = "";
    public liveTranscription: string = "";



    constructor({
        stt,
        aiService,
        onDone,
        onCancel,
        aiEnabled = false,
    }: {
        stt: STT;
        aiService: AiSTTServiceOpenAI;
        onDone: (content: Content) => void;
        onCancel: () => void;
        aiEnabled: boolean;
    }) {
        this._stt = stt;
        this._aiService = aiService;
        this._aiEnabled = aiEnabled;
        this._onDone = onDone;
        this._onCancel = onCancel;
        this.addSTTListeners();
        makeObservable(this, {
            sttState: observable,
            aiState: observable,
            content: observable,
            transcriptionBuffer: observable,
            liveTranscription: observable,
        });
    }

    public get isListening() {
        return this.sttState.isListening;
    }

    public startListening() {
        logger.debug("Start listening");
        if (this._stt.isRecognizing()) {
            this.abortListening();
        }
        this._stt.start();
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
            this.sttState = STTDataState.init();
            this.transcriptionBuffer = "";
            this.liveTranscription = "";
            if (this._aiEnabled) {
                this.startAiTranscription(this.transcriptionBuffer);
            }
            else {
                this.mockAiTranscription(this.transcriptionBuffer);
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
                previousContext: "",
                transcription: text,
            });
            const data = (await this._aiService.generateResponse(aiReq)).getOrError();
            runInAction(() => {
                this.content = data.content;
                this.aiState = DataState.data(undefined);
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
            this.content = undefined;
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


    mockAiTranscription(text: string) {
        const paragraph = Paragraph.fromText(text);
        runInAction(() => {
            this.content?.addParagraph(paragraph);
            this.aiState = DataState.data(undefined);
        });
    }


}