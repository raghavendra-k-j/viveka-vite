import { AppError, AppErrorProps } from "~/core/error/AppError";


export class AiSTTError extends AppError {

    constructor(props: AppErrorProps) {
        super(props);
    }

    static fromUnknown(error: unknown): AiSTTError {
        const base = AppError.fromAny(error);
        return new AiSTTError({
            message: "Unknown AI model error",
            description: "An unexpected error occurred while contacting the AI transcription model.",
            developerMessage: base.developerMessage ?? base.stack,
        });
    }

    static fromAny(error: any): AiSTTError {
        if (error instanceof Error) {
            return new AiSTTError({
                message: "AI model error",
                description: error.message,
                developerMessage: error.stack,
            });
        }
        else {
            return AiSTTError.unknown();
        }
    }


    static fromDescription(description: string): AiSTTError {
        return new AiSTTError({
            message: "AI model error",
            description: description,
            developerMessage: description,
        });
    }

    static unknown(): AiSTTError {
        return new AiSTTError({
            message: "Unknown AI model error",
            description: "An unexpected error occurred while contacting the AI transcription model.",
            developerMessage: "Unknown error",
        });
    }

}
