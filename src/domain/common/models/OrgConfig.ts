import { Org, type OrgJson } from "./Org";
import { Subscription, type SubscriptionJson } from "./Subscription";

export type OrgConfigJson = {
    org: OrgJson;
    subscription: SubscriptionJson;
};

export class OrgConfig {
    readonly org: Org;
    readonly subscription: Subscription;

    constructor({ org, subscription }: { org: Org; subscription: Subscription }) {
        this.org = org;
        this.subscription = subscription;
    }

    public serialize(): OrgConfigJson {
        return {
            org: this.org.serialize(),
            subscription: this.subscription.serialize(),
        };
    }

    static deserialize(json: OrgConfigJson): OrgConfig {
        const org = Org.deserialize(json.org);
        const subscription = Subscription.deserialize(json.subscription);
        return new OrgConfig({ org, subscription });
    }
}
