import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { DialogCloseButton, DialogHeader } from "~/ui/components/dialogs/DialogHeaderAndFooter";
import { FramedDialog } from "~/ui/widgets/dialogmanager";
import { useQMediaPickerStore } from "./QMediaPickerContext";
import { QMediaPickerProvider } from "./QMediaPickerProvider";
import { Observer } from "mobx-react-lite";
import { BrowseMediaView } from "./comp/BrowseMediaView";
import { UploadMediaView } from "./comp/UploadMediaView";
import { UnknowStateView } from "~/ui/components/errors/UnknowStateView";
import { QMediaPickerCurrentTab } from "./QMediaPickerStore";
import { AppStore } from "~/ui/pages/_layout/AppStore";

export type QMediaPickerProps = {
    onClose: () => void;
    onSelect: (items: QMediaTile) => void;
    appStore: AppStore;
}


export function QMediaPicker(props: QMediaPickerProps) {
    return (
        <FramedDialog
            scaffoldClassName="p-4"
            contentClassName="w-full max-w-2xl h-full max-h-[576px] overflow-hidden flex flex-col"
            onClose={() => props.onClose()}
        >
            <QMediaPickerProvider appStore={props.appStore} onClose={props.onClose} onSelect={props.onSelect}>
                <DialogBody />
            </QMediaPickerProvider>
        </FramedDialog>
    );
}


function DialogBody() {
    const store = useQMediaPickerStore();
    return (
        <>
            <DialogHeader
                title="Add Media"
                onClose={<DialogCloseButton onClick={() => store.onClose()} />}
            />
            <TabBar />
            <TabContent />
        </>
    );
}


function TabBar() {
    const store = useQMediaPickerStore();
    return (
        <div className="flex border-b border-default bg-surface">
            {store.tabs.map((tab) => (
                <TabButton key={tab} tab={tab} />
            ))}
        </div>
    );
}


function TabButton({ tab }: { tab: QMediaPickerCurrentTab }) {
    const store = useQMediaPickerStore();
    return (
        <Observer>
            {() => (
                <button
                    className={`px-4 py-2 transition-colors text-sm duration-150 font-medium border-b-2 bg-surface ${store.currentTab === tab ? "border-primary text-primary" : "border-transparent text-default"}`}
                    onClick={() => store.setCurrentTab(tab)}
                    type="button"
                >
                    {tab}
                </button>
            )}
        </Observer>
    );
}


function TabContent() {
    const store = useQMediaPickerStore();
    return (
        <Observer>
            {() => {
                if (store.isBrowseTab) {
                    return <BrowseMediaView />
                }
                else if (store.isUploadTab) {
                    return <UploadMediaView />
                }
                else {
                    return <UnknowStateView />
                }
            }}
        </Observer>
    );
}



