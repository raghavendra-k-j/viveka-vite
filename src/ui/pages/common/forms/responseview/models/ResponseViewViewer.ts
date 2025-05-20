export class ResponseDialogViewer {
    static readonly user = new ResponseDialogViewer('user');
    static readonly admin = new ResponseDialogViewer('admin');
    private constructor(public readonly value: string) { }
    get isUser(): boolean {
        return this === ResponseDialogViewer.user;
    }
    get isAdmin(): boolean {
        return this === ResponseDialogViewer.admin;
    }
    toString(): string {
        return this.value;
    }
}