import { Dialog, DialogBottomSheetScaffold, DialogContent, DialogOverlay } from "~/ui/widgets/dialogmanager";
import { QIndexPanel } from "./QIndexPanel";
import { InteractionStore } from "../InteractionStore";
import { InteractionContext } from "../InteractionContext";
import { scrollToQuestion } from "../utils/questionScrollUtil";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { FormDetailSection } from "./FormDetailComponent";



type BottomSheetDialogProps = {
    store: InteractionStore;
    onClickClose: () => void;
    children: React.ReactNode;
};

export function BottomSheetDialog({ store, onClickClose, children }: BottomSheetDialogProps) {
    return (
        <InteractionContext.Provider value={store}>
            <Dialog onClose={onClickClose}>
                <DialogOverlay onClick={onClickClose} />
                <DialogBottomSheetScaffold>
                    <DialogContent className="w-full mx-4 p-3">
                        {children}
                        <div className="p-4">
                            <OutlinedButton className="w-full" onClick={onClickClose}>
                                Close
                            </OutlinedButton>
                        </div>
                    </DialogContent>
                </DialogBottomSheetScaffold>
            </Dialog>
        </InteractionContext.Provider>
    );
}


type QuestionsBottomSheetProps = {
    store: InteractionStore;
    onClickClose: () => void;
};

export function QuestionsBottomSheet(props: QuestionsBottomSheetProps) {
    return (
        <BottomSheetDialog store={props.store} onClickClose={props.onClickClose}>
            <QIndexPanel
                onClickQuestion={(vm) => {
                    scrollToQuestion(vm);
                    props.onClickClose();
                }}
            />
        </BottomSheetDialog>
    );
}


type FormDetailBottomSheetProps = {
    store: InteractionStore;
    onClickClose: () => void;
};


export function FormDetailBottomSheet(props: FormDetailBottomSheetProps) {
    return (
        <BottomSheetDialog store={props.store} onClickClose={props.onClickClose}>
            <FormDetailSection />
        </BottomSheetDialog>
    );
}
