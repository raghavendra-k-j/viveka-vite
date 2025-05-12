export abstract class AbsUser {
    abstract get id(): number
    abstract get name(): string
    abstract get email(): string
    abstract get mobile(): string | undefined
}