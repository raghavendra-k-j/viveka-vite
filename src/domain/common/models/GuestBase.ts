import { JsonObj } from "~/core/types/Json";
import type { AbsUserBase, AbsUserProps } from "./AbsUserBase";



export type GuestBaseProps = AbsUserProps & {
    emailVerified: boolean;
}

export class GuestBase implements AbsUserBase {

    private _id: number;
    private _name: string;
    private _email: string;
    private _mobile?: string;
    private _emailVerified: boolean;

    constructor({ id, name, email, mobile, emailVerified }: GuestBaseProps) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._mobile = mobile;
        this._emailVerified = emailVerified;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get mobile(): string | undefined {
        return this._mobile;
    }

    get emailVerified(): boolean {
        return this._emailVerified;
    }

    static fromJson(json: JsonObj): GuestBase {
        return new GuestBase({
            id: json.id,
            name: json.name,
            email: json.email,
            mobile: json.mobile,
            emailVerified: json.emailVerified,
        });
    }

}
