export class UserFormStatus {
    static readonly Upcoming = new UserFormStatus("Upcoming", "Upcoming");
    static readonly Pending = new UserFormStatus("Pending", "Pending");
    static readonly Submitted = new UserFormStatus("Submitted", "Submitted");
    static readonly Closed = new UserFormStatus("Closed", "Closed");

    static readonly values = Object.freeze([
        UserFormStatus.Upcoming,
        UserFormStatus.Pending,
        UserFormStatus.Submitted,
        UserFormStatus.Closed
    ]);

    private constructor(
        public readonly status: string,
        public readonly name: string
    ) { }

    get isUpcoming(): boolean {
        return this === UserFormStatus.Upcoming;
    }

    get isPending(): boolean {
        return this === UserFormStatus.Pending;
    }

    get isSubmitted(): boolean {
        return this === UserFormStatus.Submitted;
    }

    get isClosed(): boolean {
        return this === UserFormStatus.Closed;
    }

    static fromStatus(status: string | null | undefined): UserFormStatus | null {
        if (!status) return null;
        const lowered = status.toLowerCase();
        return UserFormStatus.values.find(s => s.status.toLowerCase() === lowered) || null;
    }

    static fromDatesAndResponseId({
        startDate,
        endDate,
        responseId
    }: {
        startDate: Date;
        endDate: Date;
        responseId?: number | null;
    }): UserFormStatus {
        const now = new Date();

        if (responseId == null) {
            if (now < startDate) {
                return UserFormStatus.Upcoming;
            } else if (now > endDate) {
                return UserFormStatus.Closed;
            } else {
                return UserFormStatus.Pending;
            }
        } else {
            return UserFormStatus.Submitted;
        }
    }
}
