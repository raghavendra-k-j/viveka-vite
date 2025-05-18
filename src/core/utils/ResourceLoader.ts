export type ResourceStatus = "init" | "loading" | "success" | "error";

export class ResourceLoader<T> {
    private status: ResourceStatus = "init";
    private data: T | null = null;
    private error: Error | null = null;
    private loaderFn: () => Promise<T>;

    constructor(loaderFn: () => Promise<T>) {
        this.loaderFn = loaderFn;
    }

    get isInit(): boolean {
        return this.status === "init";
    }

    get isLoading(): boolean {
        return this.status === "loading";
    }

    get isSuccess(): boolean {
        return this.status === "success";
    }

    get isError(): boolean {
        return this.status === "error";
    }

    get value(): T | null {
        return this.data;
    }

    get failure(): Error | null {
        return this.error;
    }

    get currentStatus(): ResourceStatus {
        return this.status;
    }

    async load(): Promise<void> {
        this.status = "loading";
        this.error = null;
        this.data = null;

        try {
            const result = await this.loaderFn();
            this.data = result;
            this.status = "success";
        } catch (e) {
            this.error = e instanceof Error ? e : new Error(String(e));
            this.status = "error";
        }
    }

    async reload(): Promise<void> {
        return this.load();
    }

    match<R>(handlers: {
        init: () => R;
        loading: () => R;
        success: (data: T) => R;
        error: (err: Error) => R;
    }): R {
        switch (this.status) {
            case "init":
                return handlers.init();
            case "loading":
                return handlers.loading();
            case "success":
                return handlers.success(this.data as T);
            case "error":
                return handlers.error(this.error as Error);
            default:
                throw new Error("Unhandled resource status");
        }
    }
}
