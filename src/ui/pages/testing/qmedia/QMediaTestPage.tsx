import FilledButton from "~/ui/widgets/button/FilledButton";
import { DialogEntry, useDialogManager } from "~/ui/widgets/dialogmanager";
import { QMediaPicker, QMediaPickerProps } from "../../admin/forms/formdetail/qmediapicker/QMediaPicker";
import { useAppStore } from "../../_layout/AppContext";

export default function QMediaTestPage() {
    const dialogManager = useDialogManager();
    const appStore = useAppStore();

    const openMediaPicker = () => {
        const entry: DialogEntry<QMediaPickerProps> = {
            id: "qmedia-picker",
            component: QMediaPicker,
            props: {
                appStore: appStore,
                onClose: () => dialogManager.closeById("qmedia-picker"),
                onSelect: (item) => {
                    dialogManager.closeById("qmedia-picker");
                }
            }
        }
        dialogManager.show(entry);
    };

    return (<FilledButton onClick={() => openMediaPicker()} className="w-full">
        Open Dialog
    </FilledButton>);
}