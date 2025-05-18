import { JsonObj } from "~/core/types/Json";
import type { AbsUserBase, AbsUserProps } from "./AbsUserBase";


type UserBaseProps = AbsUserProps & {
    userName?: string;
}

export class UserBase implements AbsUserBase {

    private _id: number;
    private _name: string;
    private _email: string;
    private _mobile?: string;
    private _userName?: string;

    constructor({ id, name, email, mobile, userName }: UserBaseProps) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._mobile = mobile;
        this._userName = userName;
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
    get userName(): string | undefined {
        return this._userName;
    }

    static fromJson(json: JsonObj): UserBase {
        return new UserBase({
            id: json.id,
            name: json.name,
            email: json.email,
            mobile: json.mobile,
            userName: json.userName,
        });
    }

}