import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { ServiceURL } from "~/infra/datasources/ServiceURL";
import { DialogEntry, useDialogManager } from "~/ui/widgets/dialogmanager";
import { QuestionMediaFullScreen, QuestionMediaFullScreenProps } from "./QuestionMediaFullScreen";


export type QuestionImageViewProps = {
    media: QMediaTile;
}


export function QuestionImageView(props: QuestionImageViewProps) {
    const dialogManager = useDialogManager();

    const handleFullscreen = () => {
        const entry: DialogEntry<QuestionMediaFullScreenProps> = {
            id: "question-media-fullscreen",
            component: QuestionMediaFullScreen,
            props: {
                media: props.media,
                onClose: () => dialogManager.closeById("question-media-fullscreen"),
            }
        }
        dialogManager.show(entry);
    };

    return (
        <img
            onClick={() => handleFullscreen()}
            src={ServiceURL.getBaseUrl() + "/" + props.media.path}
            className="w-full h-full object-contain block rounded-sm"
        />
    );
}