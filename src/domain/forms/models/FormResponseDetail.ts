import { JsonObj } from "~/core/types/Json";
import { FormDetail } from "./FormDetail";
import { FormDetailExtras } from "./FormDetailExtras";

export class FormResponseDetail {

    public readonly formDetail: FormDetail;
    public readonly formDetailExtras: FormDetailExtras;

    constructor({ formDetail, formDetailExtras }: { formDetail: FormDetail; formDetailExtras: FormDetailExtras }) {
        this.formDetail = formDetail;
        this.formDetailExtras = formDetailExtras;
    }

    public static fromJson(json: JsonObj): FormResponseDetail {
        const formDetail = FormDetail.fromJson(json.formDetail);
        const formDetailExtras = FormDetailExtras.fromJson(json.formDetailExtras);
        return new FormResponseDetail({
            formDetail,
            formDetailExtras
        });
    }
}

