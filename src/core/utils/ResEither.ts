export class ResEither<Error, Data> {
    private constructor(
        private readonly errorValue?: Error,
        private readonly dataValue?: Data
    ) { }

    static error<Error, Data>(error: Error): ResEither<Error, Data> {
        return new ResEither<Error, Data>(error, undefined);
    }

    static data<Error, Data>(data: Data): ResEither<Error, Data> {
        return new ResEither<Error, Data>(undefined, data);
    }

    get isError(): boolean {
        return this.errorValue !== undefined;
    }

    get isData(): boolean {
        return this.dataValue !== undefined;
    }

    getError(): Error | undefined {
        return this.errorValue;
    }

    getData(): Data | undefined {
        return this.dataValue;
    }

    get data(): Data {
        if(!this.dataValue) {
            throw new Error("ResEither: No data available. This is an error response.");
        }
        return this.dataValue!;
    }

    get error(): Error {
        return this.errorValue!;
    }

    getOrError(): Data {
        if (this.isError) {
            throw this.errorValue;
        }
        return this.dataValue as Data;
    }

}
