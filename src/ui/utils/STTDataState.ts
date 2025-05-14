import { STTError } from "~/infra/utils/stt/STT";

export enum STTDataStateType {
    IDLE = "IDLE",
    LISTENING = "LISTENING",
    ERROR = "ERROR",
}

export class STTDataState {

    private constructor(
        public readonly type: STTDataStateType,
        public readonly error?: STTError
    ) { }

    get isIdle(): boolean {
        return this.type === STTDataStateType.IDLE;
    }

    get isListening(): boolean {
        return this.type === STTDataStateType.LISTENING;
    }

    get isError(): boolean {
        return this.type === STTDataStateType.ERROR;
    }



    static init(): STTDataState {
        return new STTDataState(STTDataStateType.IDLE);
    }

    static listening(): STTDataState {
        return new STTDataState(STTDataStateType.LISTENING);
    }

    static error(error: STTError): STTDataState {
        return new STTDataState(STTDataStateType.ERROR, error);
    }

}