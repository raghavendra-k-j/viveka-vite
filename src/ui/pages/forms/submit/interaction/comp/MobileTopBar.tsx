import FilledButton from "~/ui/widgets/button/FilledButton";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { useInteractionStore } from "../InteractionContext";
import { DialogEntry, useDialogManager } from "~/ui/widgets/dialogmanager";
import { Info } from "lucide-react";
import { Observer } from "mobx-react-lite";
import styles from "./../styles.module.css";
import { FormDetailBottomSheet, FormDetailBottomSheetProps, QuestionsBottomSheet, QuestionsBottomSheetProps } from "./FooterBottomSheet";
import { scrollToQuestion } from "../utils/questionScrollUtil";


export function MobileTopBar() {
    const store = useInteractionStore();
    const dialogmanager = useDialogManager();

    const openQuestionList = () => {
        const entry: DialogEntry<QuestionsBottomSheetProps> = {
            id: "question-list",
            component: QuestionsBottomSheet,
            props: {
                store: store,
                onClickQuestion(vm) {
                    dialogmanager.closeById("question-list");
                    scrollToQuestion(vm);
                },
                onClickClose() {
                    dialogmanager.closeById("question-list");
                },
            }
        };
        dialogmanager.show(entry);
    };

    const openInfo = () => {
        const entry: DialogEntry<FormDetailBottomSheetProps> = {
            id: "form-detail",
            component: FormDetailBottomSheet,
            props: {
                store: store,
                onClickClose() {
                    dialogmanager.closeById("form-detail");
                },
            }
        }
        dialogmanager.show(entry);
    };

    return (
        <div className={styles.mobileFooter}>
            <div className="flex gap-2">
                <OutlinedButton onClick={openQuestionList}>
                    Questions
                </OutlinedButton>
                <OutlinedButton onClick={openInfo}>
                    <Info size={16} />
                </OutlinedButton>
            </div>
            <Observer>
                {() => <FilledButton isLoading={store.submitState.isLoading} disabled={store.submitState.isLoading} onClick={() => store.onClickSubmitButton()}>
                    Submit
                </FilledButton>}
            </Observer>
        </div>
    );
}
