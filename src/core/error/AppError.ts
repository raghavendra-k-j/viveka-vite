export type AppErrorProps = {
    message: string;
    description?: string;
    developerMessage?: string;
    errorCode?: string;
}

export class AppError extends Error {
    message: string;
    description?: string;
    developerMessage?: string;
    errorCode?: string;

    constructor({ message, description, developerMessage, errorCode }: AppErrorProps) {
        super(message);
        this.message = message;
        this.description = description;
        this.developerMessage = developerMessage;
        this.errorCode = errorCode;
    }

    static fromAny(error: unknown): AppError {
        if (error instanceof AppError) {
            return error;
        }
        if (error instanceof Error) {
            return AppError.fromError(error);
        }
        return AppError.unknown();
    }


    static unknown(): AppError {
        return new AppError({
            message: "Something went wrong",
            description: "An unknown error occurred. Please try again",
        });
    }

    static fromError(error: Error): AppError {
        return new AppError({
            message: "Something went wrong",
            description: "An error occurred. Please try again",
            developerMessage: error.stack,
        });
    }

}
