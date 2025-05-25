import FilledButton from "~/ui/widgets/button/FilledButton";
import { QuestionPageProvider } from "./QuestionPageProvider";
import { useQuestionPageStore } from "./QuestionPageContext";
import { DialogEntry, useDialogManager } from "~/ui/widgets/dialogmanager";
import { UpsertQuestionDialog, UpsertQuestionDialogProps } from "../upsertquestion/UpsertQuestionDialog";
import { useStt } from "~/ui/components/sttcontext/STTContext";

export default function QuestionsPage() {
    return (<QuestionPageProvider>
        <Body />
    </QuestionPageProvider>);
}


function Body() {
    const store = useQuestionPageStore();
    const dialogManager = useDialogManager();
    const stt = useStt();

    const handleOnClickQuestion = () => {
        const entry: DialogEntry<UpsertQuestionDialogProps> = {
            id: "upsert-question",
            component: UpsertQuestionDialog,
            props: {
                id: null,
                parentId: null,
                parentStore: store,
                stt: stt,
                onClose: () => {
                    dialogManager.closeById("upsert-question");
                }
            }
        };
        dialogManager.show(entry);
    };

    return (
        <div>
            <FilledButton onClick={handleOnClickQuestion}>Add Questions</FilledButton>
        </div>
    );
}