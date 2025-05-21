import FilledButton from "~/ui/widgets/button/FilledButton";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { useInteractionStore } from "../InteractionContext";
import { useDialogManager } from "~/ui/widgets/dialogmanager";
import { FormDetailBottomSheet, QuestionsBottomSheet } from "./FooterBottomSheet";
import { Info } from "lucide-react";
import { Observer } from "mobx-react-lite";
import styles from "./../styles.module.css";


export function MobileFooterView() {
    const store = useInteractionStore();
    const dialogmanager = useDialogManager();

    const openQuestionList = () => {
        dialogmanager.show({
            id: "question-list",
            component: QuestionsBottomSheet,
            props: {
                store: store,
                onClickClose() {
                    dialogmanager.closeById("question-list");
                },
            }
        });
    };

    const openInfo = () => {
        dialogmanager.show({
            id: "form-detail",
            component: FormDetailBottomSheet,
            props: {
                store: store,
                onClickClose() {
                    dialogmanager.closeById("form-detail");
                },
            }
        });
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
                {() => <FilledButton isLoading={store.submitState.isLoading} disabled={store.submitState.isLoading} onClick={() => store.onClickSubmitForm()}>
                    Submit
                </FilledButton>}
            </Observer>
        </div>
    );
}
