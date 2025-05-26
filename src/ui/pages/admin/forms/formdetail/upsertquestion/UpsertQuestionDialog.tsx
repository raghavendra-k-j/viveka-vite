import { FramedDialog } from "~/ui/widgets/dialogmanager";
import { UpsertQuestionProvider } from "./UpsertQuestionProvider";
import { STTContext } from "~/ui/components/sttcontext/STTContext";
import { useUpsertQuestionStore } from "./UpsertQuestionContext";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { Observer } from "mobx-react-lite";
import type { FormType } from "~/domain/forms/models/FormType";
import type { STT } from "~/infra/utils/stt/STT";
import type { AdminFormsService } from "~/domain/forms/admin/services/AdminFormsService";
import { UpsertQuestionForm } from "./UpsertQuestionForm";

export type UpsertQuestionDialogProps = {
    id: number | null;
    parentId: number | null;
    formId: number;
    formType: FormType;
    stt: STT;
    adminFormsService: AdminFormsService;
    onClose: () => void;
};

export function UpsertQuestionDialog(props: UpsertQuestionDialogProps) {
    return (
        <STTContext.Provider value={props.stt}>
            <FramedDialog
                onClose={props.onClose}
                scaffoldClassName="p-4"
                contentClassName="w-full max-w-2xl h-full flex flex-col"
            >
                <UpsertQuestionProvider {...props}>
                    <Body />
                </UpsertQuestionProvider>
            </FramedDialog>
        </STTContext.Provider>
    );
}

function Body() {
    return (
        <>
            <Header />
            <UpsertQuestionForm />
            <Footer />
        </>
    );
}

function Header() {
    const store = useUpsertQuestionStore();
    const title = store.vm.id ? "Edit Question" : "New Question";
    return (
        <div className="flex flex-row rounded-t-sm bg-slate-50 border-b border-default">
            <h1 className="text-base text-strong font-semibold px-4 py-2">{title}</h1>
        </div>
    );
}

function Footer() {
    const store = useUpsertQuestionStore();
    return (
        <div className="flex rounded-b-sm bg-slate-50 justify-end gap-3 px-3 py-2 border-t border-default">
            <OutlinedButton onClick={() => store.onClose()}>Close</OutlinedButton>
            <Observer>
                {() => (
                    <FilledButton
                        isLoading={store.saveState.isLoading}
                        disabled={store.saveState.isLoading}
                        onClick={store.saveQuestion}
                    >
                        Save
                    </FilledButton>
                )}
            </Observer>
        </div>
    );
}