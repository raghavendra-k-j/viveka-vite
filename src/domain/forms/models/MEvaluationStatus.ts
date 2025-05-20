export class MEvaluationStatus {
    static readonly NOT_REQUIRED = new MEvaluationStatus("NOT_REQUIRED", "Not Required");
    static readonly PENDING = new MEvaluationStatus("PENDING", "Pending");
    static readonly AI_DONE = new MEvaluationStatus("AI_DONE", "Auto Evaluated");
    static readonly DONE = new MEvaluationStatus("DONE", "Manually Evaluated");

    static readonly values = [
        MEvaluationStatus.NOT_REQUIRED,
        MEvaluationStatus.PENDING,
        MEvaluationStatus.AI_DONE,
        MEvaluationStatus.DONE,
    ];

    readonly status: string;
    readonly name: string;

    private constructor(status: string, name: string) {
        this.status = status;
        this.name = name;
    }

    get isNotRequired() { return this === MEvaluationStatus.NOT_REQUIRED; }
    get isPending() { return this === MEvaluationStatus.PENDING; }
    get isAuto() { return this === MEvaluationStatus.AI_DONE; }
    get isDone() { return this === MEvaluationStatus.DONE; }
    get isPendingOrDone() { return this.isPending || this.isDone; }

    static fromString(status?: string): MEvaluationStatus | undefined {
        if (!status) return undefined;
        return MEvaluationStatus.values.find(f => f.status.toLowerCase() === status.toLowerCase());
    }
}