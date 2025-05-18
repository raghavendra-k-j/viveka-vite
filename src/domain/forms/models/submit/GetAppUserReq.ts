export type GetAppUserReqProps = {
    formId: number;
    name: string;
    email: string;
    mobile?: string;
};

export class GetAppUserReq {
    formId: number;
    name: string;
    email: string;
    mobile?: string;

    constructor(props: GetAppUserReqProps) {
        this.formId = props.formId;
        this.name = props.name;
        this.email = props.email;
        this.mobile = props.mobile;
    }

    toJson() {
        return {
            formId: this.formId,
            name: this.name,
            email: this.email,
            mobile: this.mobile,
        };
    }

}