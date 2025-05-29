import { Observer, observer } from "mobx-react-lite";
import { useInteractionStore } from "../InteractionContext";
import FilledButton from "~/ui/widgets/button/FilledButton";
import styles from "./../styles.module.css";
import { QIndexPanel } from "./QIndexPanel";
import clsx from "clsx";
import { scrollToQuestion } from "../utils/questionScrollUtil";


export const RightSidebar = observer(() => {
    return (
        <div className={clsx(styles.rightPanel)}>
            <QIndexPanel onClickQuestion={scrollToQuestion} />
            <QuestionPanelFooter />
        </div>
    );
});



const QuestionPanelFooter = () => {
    const store = useInteractionStore();
    return (
        <Observer>
            {() => {
                return (
                    <div className="mt-3">
                        <FilledButton className="w-full" isLoading={store.submitState.isLoading} disabled={store.submitState.isLoading} onClick={() => store.onClickSubmitButton()}>Submit {store.formType.name}</FilledButton>
                    </div>
                );
            }}
        </Observer>
    );
};
