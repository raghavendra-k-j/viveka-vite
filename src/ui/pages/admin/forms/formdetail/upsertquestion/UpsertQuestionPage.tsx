import { UpsertQuestionProvider } from "./UpsertQuestionProvider";
import { STTContext, useStt } from "~/ui/components/sttcontext/STTContext";
import { useUpsertQuestionStore } from "./UpsertQuestionContext";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { Observer } from "mobx-react-lite";
import { UpsertQuestionForm } from "./UpsertQuestionForm";
import { useSearchParams } from "react-router";
import { UpsertQuestionDialogProps } from "./UpsertQuestionDialog";
import { useAdminFormStore } from "../layout/AdminFormContext";
import { useDialogManager } from "~/ui/widgets/dialogmanager";


export default function UpsertQuestionPage() {
    const [searchParams] = useSearchParams();
    const questionId = searchParams.get("questionId");
    const parentId = searchParams.get("parentId");
    const stt = useStt();
    const formStore = useAdminFormStore();
    const dialogManager = useDialogManager();

    const props: UpsertQuestionDialogProps = {
        id: questionId ? parseInt(questionId) : null,
        parentId: parentId ? parseInt(parentId) : null,
        formId: formStore.fd.id,
        formType: formStore.fd.type,
        stt: stt,
        adminFormsService: formStore.adminFormService,
        onClose: () => { },
        dialogManager: dialogManager,
    }

    return (
        <STTContext.Provider value={stt}>
            <UpsertQuestionProvider {...props}>
                <UpsertQuestionInner />
            </UpsertQuestionProvider>
        </STTContext.Provider>
    );
}

function UpsertQuestionInner() {
    return (
        <div className="flex flex-col h-full bg-surface">
            <UpsertQuestionForm />
            <Footer />
        </div>
    );
}


function Footer() {
    const store = useUpsertQuestionStore();
    return (
        <div className="flex rounded-b-sm justify-end gap-3 px-3 py-2 border-t border-default">
            <Observer>
                {() => (
                    <FilledButton
                        isLoading={store.saveState.isLoading}
                        disabled={store.saveState.isLoading}
                        onClick={() => store.saveQuestion()}
                    >
                        Save
                    </FilledButton>
                )}
            </Observer>
        </div>
    );
}