import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { ServiceURL } from "~/infra/datasources/ServiceURL";

export type QuestionVideoViewProps = {
    media: QMediaTile;
}


export function QuestionVideoView(props: QuestionVideoViewProps) {
    return (
        <video
            className="w-full h-full object-cover rounded-sm"
            controls
            src={ServiceURL.getBaseUrl() + "/" + props.media.path}
        >
            Your browser does not support the video tag.
        </video>
    );
}

