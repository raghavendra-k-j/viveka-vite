import { Observer } from "mobx-react-lite";
import { useQMediaPickerStore } from "../QMediaPickerContext";
import { AppError } from "~/core/error/AppError";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";
import { useEffect } from "react";
import { QMedia } from "~/domain/forms/models/qmedia/QMedia";
import { FileSizeFmt } from "~/core/utils/FileSizeFmt";
import { QMediaType } from "~/domain/forms/models/qmedia/QMediaType";
import { File, Image, Video } from "lucide-react";
import clsx from "clsx";
import { QMediaPickerStore } from "../QMediaPickerStore";
import { observer } from "mobx-react-lite";
import { DialogFooter } from "~/ui/components/dialogs/DialogHeaderAndFooter";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { FInput } from "~/ui/widgets/form/input/FInput";

export function BrowseMediaView() {
    const store = useQMediaPickerStore();

    useEffect(() => {
        store.loadFiles();
    });

    return <MainContent />
}



function Centered({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center h-full justify-center h-full overflow-auto min-h-0">
            {children}
        </div>
    );
}


function MainContent() {
    return (<>
        <MainContentBody />
        <Footer />
    </>);
}


function Footer() {
    const store = useQMediaPickerStore();
    return (
        <DialogFooter
            actions={[
                <OutlinedButton key="cancel" onClick={() => store.onClose()}>Cancel</OutlinedButton>,
                <Observer key="confirm">
                    {() => <FilledButton onClick={() => store.onClickConfirm()} disabled={store.isConfirmDisabled}>Confirm</FilledButton>}
                </Observer>
            ]}
        />
    );
}


function MainContentBody() {
    return (
        <div className="h-full min-h-0 overflow-hidden flex flex-col">
            <SearchBar />
            <MainContentList />
        </div>
    );
}



function MainContentList() {
    const store = useQMediaPickerStore();
    return (
        <Observer>
            {() => {
                return store.loadState.stateWhen({
                    initOrLoading: () => <Centered><LoaderView /></Centered>,
                    error: (error: AppError) => <Centered><SimpleRetryableAppView onRetry={() => store.loadFiles()} appError={error} /></Centered>,
                    loaded: () => <LoadedView />
                });
            }}
        </Observer>
    );
}


function LoadedView() {
    const store = useQMediaPickerStore();
    return (
        <div className="h-full min-h-0 overflow-hidden bg-background overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {store.items.map((file) => (
                    <MediaItem
                        key={file.id}
                        store={store}
                        file={file}
                        onSelect={() => store.selectMedia(file)}
                        thumbnailPath={store.thumbnailPath(file)} />
                ))}
            </div>
        </div>
    );

}




function SearchBar() {
    const store = useQMediaPickerStore();
    return (
        <div className="p-4 bg-surface border-b border-default">
            <Observer>
                {() => (<FInput
                    maxLength={100}
                    placeholder="Search media files..."
                    value={store.searchQuery}
                    onChange={(e) => store.onSearchQueryChange(e.target.value)}
                />)}
            </Observer>
        </div>
    );
}




type MediaItemProps = {
    file: QMedia;
    onSelect: () => void;
    thumbnailPath: string;
    store: QMediaPickerStore,
};


const MediaItem = observer(({ store, file, onSelect, thumbnailPath }: MediaItemProps) => {
    const isSelected = store.selectedItem?.id === file.id;
    return (
        <div
            className={clsx(
                "p-2 border shadow-xs rounded hover:shadow-sm cursor-pointer flex flex-col bg-surface h-full",
                isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-default"
            )}
            tabIndex={0}
            onClick={onSelect}
        >
            <div className="flex-1 flex items-center justify-center mb-2 min-h-0">
                <img src={thumbnailPath} alt={file.name} className="w-full h-32 object-cover rounded-sm" />
            </div>
            <div className="flex flex-row items-center gap-2 border-t border-default pt-2 mt-2">
                <FileTypeIcon type={file.type} />
                <div className="flex flex-col min-w-0">
                    <p
                        className={clsx(
                            "text-sm font-medium truncate",
                            isSelected ? "text-primary" : "text-default"
                        )}
                        title={file.name}
                    >
                        {file.name}
                    </p>
                    <p className="text-xs text-secondary whitespace-nowrap">
                        {FileSizeFmt.humanReadable(file.size)}
                    </p>
                </div>
            </div>
        </div>
    );
});


function FileTypeIcon({ type }: { type: QMediaType }) {
    let Icon = null;
    let iconColor = "text-secondary";
    let bgColor = "bg-slate-100";
    switch (type) {
        case QMediaType.image:
            Icon = Image;
            iconColor = "text-amber-500";
            bgColor = "bg-amber-50";
            break;
        case QMediaType.video:
            Icon = Video;
            iconColor = "text-red-500";
            bgColor = "bg-red-50";
            break;
        default:
            Icon = File
            break;
    }
    // Fix icon size by using flex-none and fixed width/height
    const FileIcon = <Icon className={clsx("w-5 h-5 flex-none", iconColor)} />;
    return (
        <div className={clsx("p-1 rounded-full w-8 h-8 flex items-center justify-center flex-none", bgColor)}>
            {FileIcon}
        </div>
    );

}