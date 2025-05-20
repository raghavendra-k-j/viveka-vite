import type { AppError } from "~/core/error/AppError";
import { InstanceId } from "~/core/utils/InstanceId";

export enum DataStateState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR',
}

export class DataState<Data> {

    private constructor(
        private readonly stateValue: DataStateState,
        private readonly dataValue: Data | null = null,
        private readonly errorValue: AppError | null = null,
        public readonly instanceId: string = InstanceId.generate(),
    ) { }

    static init<Data>(): DataState<Data> {
        return new DataState<Data>(DataStateState.INIT);
    }

    static loading<Data>(): DataState<Data> {
        return new DataState<Data>(DataStateState.LOADING);
    }

    static data<Data>(data: Data): DataState<Data> {
        return new DataState<Data>(DataStateState.LOADED, data);
    }

    static error<Data>(error: AppError): DataState<Data> {
        return new DataState<Data>(DataStateState.ERROR, null, error);
    }

    get isInit(): boolean {
        return this.stateValue === DataStateState.INIT;
    }

    get isLoading(): boolean {
        return this.stateValue === DataStateState.LOADING;
    }

    get isLoaded(): boolean {
        return this.stateValue === DataStateState.LOADED;
    }

    get isError(): boolean {
        return this.stateValue === DataStateState.ERROR;
    }

    get data(): Data | null {
        return this.dataValue;
    }

    get error(): AppError {
        if (!this.isError) {
            throw new Error('DataState is not in error state');
        }
        return this.errorValue!;
    }

    when<T>(handlers: {
        init: () => T;
        loading: () => T;
        loaded: (data: Data) => T;
        error: (error: AppError) => T;
    }): T {
        switch (this.stateValue) {
            case DataStateState.INIT:
                return handlers.init();
            case DataStateState.LOADING:
                return handlers.loading();
            case DataStateState.LOADED:
                return handlers.loaded(this.dataValue as Data);
            case DataStateState.ERROR:
                return handlers.error(this.errorValue as AppError);
            default:
                throw new Error('Unhandled state in DataState.when()');
        }
    }

    stateWhen<T>(handlers: {
        initOrLoading: () => T;
        loaded: (data: Data) => T;
        error: (error: AppError) => T;
    }): T {
        switch (this.stateValue) {
            case DataStateState.INIT:
            case DataStateState.LOADING:
                return handlers.initOrLoading();
            case DataStateState.LOADED:
                return handlers.loaded(this.dataValue as Data);
            case DataStateState.ERROR:
                return handlers.error(this.errorValue as AppError);
            default:
                throw new Error('Unhandled state in DataState.stateWhen()');
        }
    }


}
