export type AbsUserProps = {
    id: number;
    name: string;
    email: string;
    mobile?: string;
}

export abstract class AbsUserBase {
    abstract get id(): number;
    abstract get name(): string;
    abstract get email(): string;
    abstract get mobile(): string | undefined;
}