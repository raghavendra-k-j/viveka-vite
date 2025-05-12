import type { FormStatus } from "./FormStatus";

export class AdminFormStatus {
    static readonly Draft = new AdminFormStatus("Draft", "Draft");
    static readonly Published = new AdminFormStatus("Published", "Published");
    static readonly Active = new AdminFormStatus("Active", "Active");
    static readonly Closed = new AdminFormStatus("Closed", "Closed");
    static readonly Archived = new AdminFormStatus("Archived", "Archived");

    static readonly values = Object.freeze([
        AdminFormStatus.Draft,
        AdminFormStatus.Published,
        AdminFormStatus.Active,
        AdminFormStatus.Closed,
        AdminFormStatus.Archived
    ]);

    private constructor(
        public readonly status: string,
        public readonly name: string
    ) { }

    get isDraft(): boolean {
        return this === AdminFormStatus.Draft;
    }

    get isPublished(): boolean {
        return this === AdminFormStatus.Published;
    }

    get isActive(): boolean {
        return this === AdminFormStatus.Active;
    }

    get isClosed(): boolean {
        return this === AdminFormStatus.Closed;
    }

    get isArchived(): boolean {
        return this === AdminFormStatus.Archived;
    }

    static fromDbStatus({
        dbStatus,
        now,
        startDate,
        endDate
    }: {
        dbStatus: FormStatus;
        now: Date;
        startDate: Date | null;
        endDate: Date | null;
    }): AdminFormStatus {
        if (dbStatus.isDraft) return AdminFormStatus.Draft;
        if (dbStatus.isArchived) return AdminFormStatus.Archived;
        if (dbStatus.isPublished) {
            if (startDate && (startDate > now || startDate.getTime() === now.getTime())) {
                return AdminFormStatus.Published;
            }
            if (endDate && endDate < now) {
                return AdminFormStatus.Closed;
            }
            return AdminFormStatus.Active;
        }
        throw new Error('Invalid FormStatus');
    }
}
