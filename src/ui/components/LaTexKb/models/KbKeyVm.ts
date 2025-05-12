import type { KbKey } from "~/domain/latexkb/models/KbKey";

export class KbKeyVm {
    base: KbKey;
    constructor({ base }: { base: KbKey }) {
        this.base = base;
    }

    static fromKbKey(key: KbKey): KbKeyVm {
        return new KbKeyVm({ base: key });
    }

}