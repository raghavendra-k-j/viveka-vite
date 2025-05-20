import { FormDetail } from "~/domain/forms/models/FormDetail";
import { FormDetailExtras } from "~/domain/forms/models/FormDetailExtras";
import { FormResponseDetail } from "~/domain/forms/models/FormResponseDetail";

export class RDFormDetailVm {

    formDetail: FormDetail;
    formDetailExtras: FormDetailExtras;

    constructor({ formDetail, formDetailExtras }: { formDetail: FormDetail; formDetailExtras: FormDetailExtras }) {
        this.formDetail = formDetail;
        this.formDetailExtras = formDetailExtras;
    }

    static fromModel(res: FormResponseDetail) {
        return new RDFormDetailVm({
            formDetail: res.formDetail,
            formDetailExtras: res.formDetailExtras
        });
    }

}