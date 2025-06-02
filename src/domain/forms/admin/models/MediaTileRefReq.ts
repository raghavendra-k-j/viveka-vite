import { JsonObj } from "~/core/types/Json";

export type MediaTileRefReqProps = {
    id: number;
    caption: string | null
}

export class MediaTileRefReq {
    public readonly id: number;
    public readonly caption: string | null;

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