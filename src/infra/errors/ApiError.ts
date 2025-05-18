import { AxiosError } from "axios";
import { AppError, type AppErrorProps } from "~/core/error/AppError";
import { logger } from "~/core/utils/logger";

type ApiErrorProps = AppErrorProps & {
    statusCode?: number;
}




export class ApiError extends AppError {
    statusCode?: number;

    constructor({ statusCode, ...props }: ApiErrorProps) {
        super(props);
        this.statusCode = statusCode;
    }

    static fromAny(error: unknown): ApiError {
        logger.debug("error", error);
        if (error instanceof AxiosError) {
            return ApiError.fromAxiosError(error);
        }
        if (error instanceof Error) {
            return ApiError.fromError(error);
        }
        return ApiError.unknown();
    }

    static fromAxiosError(error: AxiosError): ApiError {
        logger.debug("fromAxiosError", error);
        const response = error.response as any;

        if (!response) {
            return ApiError.parseError();
        }

        const data = response.data as any;

        const message: string = data["message"] as string;
        const description: string = data["description"] as string;
        const statusCode: number | undefined = error.status;

        return new ApiError({
            message,
            description,
            statusCode: statusCode,
        });
    }

    static unknown(): ApiError {
        return new ApiError({
            message: "Something went wrong",
            description: "An unexpected error occurred, Please try again",
        });
    }

    static parseError(): ApiError {
        return new ApiError({
            message: "Unknown network error",
            description: "An error occurred while communicating with the server. Please try again",
        });
    }

    static cancelled(): ApiError {
        return new ApiError({
            message: "Request cancelled",
            statusCode: 499,
        });
    }

    get isCancelled(): boolean {
        return this.statusCode === 499;
    }

    get isNotFound(): boolean {
        return this.statusCode === 404;
    }

    get isUnauthorized(): boolean {
        return this.statusCode === 401;
    }

    get isForbidden(): boolean {
        return this.statusCode === 403;
    }

    get isServerError(): boolean {
        return this.statusCode === 500;
    }

    isServerIssue(): boolean {
        return this.statusCode !== undefined && this.statusCode >= 500 && this.statusCode < 600;
    }

    static fromError(error: Error): ApiError {
        return new ApiError({
            message: "Something went wrong",
            description: "An error occurred. Please try again",
            developerMessage: error.stack,
        });
    }
}
