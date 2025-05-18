import { JsonObj } from "~/core/types/Json";
import type { AbsUser } from "./AbsUser";
import { AppUserType } from "./AppUserType";
import { GuestBase } from "./GuestBase";

export class GuestUser implements AbsUser {
    base: GuestBase;

    constructor(base: GuestBase) {
        this.base = base;
    }
    get id(): number {
        return this.base.id;
    }
    get name(): string {
        return this.base.name;
    }
    get email(): string {
        return this.base.email;
    }
    get mobile(): string | undefined {
        return this.base.mobile;
    }

    get appUserType(): AppUserType {
        return AppUserType.guest;
    }

    static fromJson(json: JsonObj): GuestUser {
        const base = GuestBase.fromJson(json);
        return new GuestUser(base);
    }


}