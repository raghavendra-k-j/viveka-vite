import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { ServiceURL } from "~/infra/datasources/ServiceURL";
import { FramedDialog } from "~/ui/widgets/dialogmanager";
import { DialogFooter } from "../../dialogs/DialogHeaderAndFooter";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";

export type QuestionMediaFullScreenProps = {
    media: QMediaTile;
    onClose: () => void;
};

export function QuestionMediaFullScreen({ media, onClose }: QuestionMediaFullScreenProps) {
    const type = media.type;
    return (
        <FramedDialog
            scaffoldClassName="p-6"
            contentClassName="w-full h-full max-w-2xl max-h-[700px] p-4 flex flex-col"
            onClose={onClose}>
            <div className="w-full h-full flex items-center justify-center">
                {type.isImage && (
                    <img
                        src={ServiceURL.getBaseUrl() + "/" + media.path}
                        className="w-full h-full object-contain block"
                    />
                )}
                {type.isVideo && (
                    <video
                        className="w-full h-full object-contain block"
                        controls
                        src={ServiceURL.getBaseUrl() + "/" + media.path}
                    >
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            <DialogFooter
                actions={[
                    <OutlinedButton key="close" onClick={onClose} className="w-full">
                        Close
                    </OutlinedButton>
                ]}
            />
        </FramedDialog>
    );
}
