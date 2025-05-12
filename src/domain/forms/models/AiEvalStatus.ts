export class AiEvalStatus {
    static readonly Success = new AiEvalStatus({ value: "SUCCESS", label: "Completed" });
    static readonly Failed = new AiEvalStatus({ value: "FAILED", label: "Failed" });
    static readonly Pending = new AiEvalStatus({ value: "PENDING", label: "Pending" });
    static readonly Canceled = new AiEvalStatus({ value: "CANCELED", label: "Canceled" });

    readonly value: string;
    readonly label: string;

    private constructor({ value, label }: { value: string; label: string }) {
        this.value = value;
        this.label = label;
    }

    static readonly values = Object.freeze([
        AiEvalStatus.Success,
        AiEvalStatus.Failed,
        AiEvalStatus.Pending,
        AiEvalStatus.Canceled
    ]);

    private static readonly valueMap = Object.freeze(
        AiEvalStatus.values.reduce((map, status) => {
            map[status.value] = status;
            return map;
        }, {} as Record<string, AiEvalStatus>)
    );

    static fromValue(value: string): AiEvalStatus {
        const status = AiEvalStatus.valueMap[value];
        if (!status) {
            throw new Error(`Invalid value: ${value}`);
        }
        return status;
    }

}