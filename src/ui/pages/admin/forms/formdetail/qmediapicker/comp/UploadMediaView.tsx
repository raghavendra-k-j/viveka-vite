import { Upload } from "lucide-react";
import { useQMediaPickerStore } from "../QMediaPickerContext";
import { QMediaExtension } from "~/domain/forms/models/qmedia/QMediaExtension";
import { FileSizeFmt } from "~/core/utils/FileSizeFmt";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { Observer } from "mobx-react-lite";

export function UploadMediaView() {
    const store = useQMediaPickerStore();
    const imageExtensions = [
        QMediaExtension.extensionJpeg,
        QMediaExtension.extensionJpg,
        QMediaExtension.extensionPng,
    ];

    const videoExtensions = [
        QMediaExtension.extensionMp4,
    ];

    const maxAllowedImageSize = FileSizeFmt.mbToHumanReadable(store.maxAllowedImageSize);
    const maxAllowedVideoSize = FileSizeFmt.mbToHumanReadable(store.maxAllowedVideoSize);

    return (
        <div className="text-center p-6 overflow-auto">
            <div className="text-primary p-4 flex justify-center">
                <div className="bg-primary-50 rounded-full p-4"><Upload size={48} /></div>
            </div>
            <div className="flex gap-2 flex-col items-center">
                <h2 className="text-lg font-semibold text-default">Upload an Image or Video</h2>
                <p className="text-sm text-secondary">
                    Accepted formats: {imageExtensions.map(ext => `${ext}`).join(", ")} (up to {maxAllowedImageSize}), {videoExtensions.map(ext => `.${ext}`).join(", ")} (up to {maxAllowedVideoSize}).
                </p>
                <Observer>
                    {() => {
                        return (
                            <FilledButton isLoading={store.uploadState.isLoading} disabled={store.isUploadButtonDisabled} onClick={() => store.openFilePicker()} className="mt-4">
                                {store.uploadState.isLoading ? "Uploading..." : "Select File"}
                            </FilledButton>
                        );
                    }}
                </Observer>
            </div>
        </div>
    );
}