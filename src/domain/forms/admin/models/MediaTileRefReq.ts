import { JsonObj } from "~/core/types/Json";

export type MediaTileRefReqProps = {
    id: number;
    caption?: string;
}

export class MediaTileRefReq {
    public readonly id: number;
    public readonly caption?: string;

    constructor(props: MediaTileRefReqProps) {
        this.id = props.id;
        this.caption = props.caption;
    }

    toJson(): JsonObj {
        return {
            id: this.id,
            caption: this.caption,
        };
    }
}