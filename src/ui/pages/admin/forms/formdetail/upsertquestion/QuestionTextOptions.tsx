import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { useUpsertQuestionStore } from "./UpsertQuestionContext";
import { Observer } from "mobx-react-lite";
import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { UpsertQuestionStore } from "./UpsertQuestionStore";
import { ServiceURL } from "~/infra/datasources/ServiceURL";
import { MdClose } from "react-icons/md";

export function QuestionTextOptions() {
    const store = useUpsertQuestionStore();
    return (
        <div>
            <div className="flex flex-row items-center justify-start gap-2">
                {store.vm.questionOptionsVm ? store.vm.questionOptionsVm.render() : null}
                <div>
                    <OutlinedButton onClick={() => store.handleOnAddMedia()} size="sm">Add Images or Videos</OutlinedButton>
                </div>
            </div>
            <Observer>
                {() => {
                    if (store.vm.mediaFiles.length === 0) {
                        return null;
                    }
                    return (
                        <div className="flex flex-row overflow-x-auto gap-2 py-2">
                            {store.vm.mediaFiles.map((file) => (
                                <MediaItemPreview key={file.id} item={file} store={store} />
                            ))}
                        </div>
                    );
                }}
            </Observer>
        </div>
    );
}



function MediaItemPreview({ item, store }: { item: QMediaTile, store: UpsertQuestionStore }) {
    const thumbnailURL = ServiceURL.getUrl(`/${item.type.isImage ? item.path : item.thumbnail || ''}`);
    return (
        <div className="w-36 h-36 flex-shrink-0 gap-2 relative p-2 bg-surface rounded-sm shadow-sm border border-default">
            <img src={thumbnailURL} className="w-full h-full object-cover rounded-sm" />
            <button
                type="button"
                className="absolute  top-1 right-1 bg-white rounded-sm p-1 shadow hover:bg-gray-100"
                onClick={() => store.vm.removeMediaFile(item)}
                aria-label="Remove"
            >
                <MdClose className="text-secondary" size={18} />
            </button>
        </div>
    );
}