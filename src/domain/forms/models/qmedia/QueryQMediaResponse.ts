import { JsonObj } from "~/core/types/Json";
import { QMedia } from "./QMedia";

export type PageInfoProps = {
    availableCount: number;
    filteredCount: number;
    page: number;
    pageSize: number;
}

export class PageInfo {

    availableCount: number;
    filteredCount: number;
    page: number;
    pageSize: number;

    constructor(props: PageInfoProps) {
        this.availableCount = props.availableCount;
        this.filteredCount = props.filteredCount;
        this.page = props.page;
        this.pageSize = props.pageSize;
    }

    static fromMap(map: JsonObj): PageInfo {
        return new PageInfo({
            availableCount: map.availableCount,
            filteredCount: map.filteredCount,
            page: map.page,
            pageSize: map.pageSize
        });
    }

}


export type QueryQMediaResponseProps = {
    items: QMedia[];
    pageInfo: PageInfo;
}

export class QueryQMediaResponse {
    items: QMedia[];
    pageInfo: PageInfo;

    constructor(props: QueryQMediaResponseProps) {
        this.items = props.items;
        this.pageInfo = props.pageInfo;
    }

    static fromMap(map: JsonObj): QueryQMediaResponse {
        return new QueryQMediaResponse({
            items: map.items.map((item: JsonObj) => QMedia.fromJson(item)),
            pageInfo: PageInfo.fromMap(map.pageInfo)
        });
    }
}

