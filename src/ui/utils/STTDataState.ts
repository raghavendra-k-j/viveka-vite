import { STTError } from "~/infra/utils/stt/STT";

export enum STTDataStateType {
    IDLE = "IDLE",
    LISTENING = "LISTENING",
    WAITING_TO_START = "WAITING_TO_START",
    WAITING_TO_END = "WAITING_TO_END",
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

    get isWaitingToStart(): boolean {
        return this.type === STTDataStateType.WAITING_TO_START;
    }

    get isWaitingToEnd(): boolean {
        return this.type === STTDataStateType.WAITING_TO_END;
    }

    get isActive(): boolean {
        return this.isListening || this.isWaitingToStart || this.isWaitingToEnd;
    }

    get isWaiting(): boolean {
        return this.isWaitingToStart || this.isWaitingToEnd;
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

    static waitingToStart(): STTDataState {
        return new STTDataState(STTDataStateType.WAITING_TO_START);
    }

    static waitingToEnd(): STTDataState {
        return new STTDataState(STTDataStateType.WAITING_TO_END);
    }


}