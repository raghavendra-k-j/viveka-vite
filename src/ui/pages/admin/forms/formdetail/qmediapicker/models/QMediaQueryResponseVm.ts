import { PageInfo } from "~/domain/common/models/PageInfo";
import { QMedia } from "~/domain/forms/models/qmedia/QMedia";
import { QueryQMediaResponse } from "~/domain/forms/models/qmedia/QueryQMediaResponse";

export type QMediaQueryResponseVmProps = {
    items: QMedia[];
    pageInfo: PageInfo;
}

export class QMediaQueryResponseVm {

    public readonly items: QMedia[];
    public readonly pageInfo: PageInfo;

    constructor(props: QMediaQueryResponseVmProps) {
        this.items = props.items;
        this.pageInfo = props.pageInfo;
    }

    static fromModel(response: QueryQMediaResponse): QMediaQueryResponseVm {
        return new QMediaQueryResponseVm({
            items: response.items,
            pageInfo: response.pageInfo,
        });
    }
}