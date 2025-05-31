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

    static fromMap(map: Record<string, any>): PageInfo {
        return new PageInfo({
            availableCount: map.availableCount,
            filteredCount: map.filteredCount,
            page: map.page,
            pageSize: map.pageSize
        });
    }

}