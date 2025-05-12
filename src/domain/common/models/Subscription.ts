export type SubscriptionJson = {
    id: number;
    isTrial: boolean;
    createdAt: string;
    startDate: string;
    endDate: string;
    name: string;
    formQGenFSize: number;
    formQGenMaxQs: number;
    formQMediaImageFSize: number;
    formQMediaVideoFSize: number;
    szFSize: number;
    szMaxWords: number;
    lrFSize: number;
    showNewFormButtons: boolean;
    maxForms: number;
    maxUsers: number;
};

export class Subscription {
    readonly id: number;
    readonly isTrial: boolean;
    readonly createdAt: Date;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly name: string;
    readonly formQGenFSize: number;
    readonly formQGenMaxQs: number;
    readonly formQMediaImageFSize: number;
    readonly formQMediaVideoFSize: number;
    readonly szFSize: number;
    readonly szMaxWords: number;
    readonly lrFSize: number;
    readonly showNewFormButtons: boolean;
    readonly maxForms: number;
    readonly maxUsers: number;

    constructor(props: {
        id: number;
        isTrial: boolean;
        createdAt: Date;
        startDate: Date;
        endDate: Date;
        name: string;
        formQGenFSize: number;
        formQGenMaxQs: number;
        formQMediaImageFSize: number;
        formQMediaVideoFSize: number;
        szFSize: number;
        szMaxWords: number;
        lrFSize: number;
        showNewFormButtons: boolean;
        maxForms: number;
        maxUsers: number;
    }) {
        this.id = props.id;
        this.isTrial = props.isTrial;
        this.createdAt = props.createdAt;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.name = props.name;
        this.formQGenFSize = props.formQGenFSize;
        this.formQGenMaxQs = props.formQGenMaxQs;
        this.formQMediaImageFSize = props.formQMediaImageFSize;
        this.formQMediaVideoFSize = props.formQMediaVideoFSize;
        this.szFSize = props.szFSize;
        this.szMaxWords = props.szMaxWords;
        this.lrFSize = props.lrFSize;
        this.showNewFormButtons = props.showNewFormButtons;
        this.maxForms = props.maxForms;
        this.maxUsers = props.maxUsers;
    }

    get getId() { return this.id; }
    get getIsTrial() { return this.isTrial; }
    get getCreatedAt() { return this.createdAt; }
    get getStartDate() { return this.startDate; }
    get getEndDate() { return this.endDate; }
    get getName() { return this.name; }
    get getFormQGenFSize() { return this.formQGenFSize; }
    get getFormQGenMaxQs() { return this.formQGenMaxQs; }
    get getFormQMediaImageFSize() { return this.formQMediaImageFSize; }
    get getFormQMediaVideoFSize() { return this.formQMediaVideoFSize; }
    get getSzFSize() { return this.szFSize; }
    get getSzMaxWords() { return this.szMaxWords; }
    get getLrFSize() { return this.lrFSize; }
    get getShowNewFormButtons() { return this.showNewFormButtons; }
    get getMaxForms() { return this.maxForms; }
    get getMaxUsers() { return this.maxUsers; }

    public serialize(): SubscriptionJson {
        return {
            id: this.id,
            isTrial: this.isTrial,
            createdAt: this.createdAt.toISOString(),
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            name: this.name,
            formQGenFSize: this.formQGenFSize,
            formQGenMaxQs: this.formQGenMaxQs,
            formQMediaImageFSize: this.formQMediaImageFSize,
            formQMediaVideoFSize: this.formQMediaVideoFSize,
            szFSize: this.szFSize,
            szMaxWords: this.szMaxWords,
            lrFSize: this.lrFSize,
            showNewFormButtons: this.showNewFormButtons,
            maxForms: this.maxForms,
            maxUsers: this.maxUsers,
        };
    }

    
    public static deserialize(json: SubscriptionJson): Subscription {
        return new Subscription({
            id: json.id,
            isTrial: json.isTrial,
            createdAt: new Date(json.createdAt),
            startDate: new Date(json.startDate),
            endDate: new Date(json.endDate),
            name: json.name,
            formQGenFSize: json.formQGenFSize,
            formQGenMaxQs: json.formQGenMaxQs,
            formQMediaImageFSize: json.formQMediaImageFSize,
            formQMediaVideoFSize: json.formQMediaVideoFSize,
            szFSize: json.szFSize,
            szMaxWords: json.szMaxWords,
            lrFSize: json.lrFSize,
            showNewFormButtons: json.showNewFormButtons,
            maxForms: json.maxForms,
            maxUsers: json.maxUsers,
        });
    }
}
