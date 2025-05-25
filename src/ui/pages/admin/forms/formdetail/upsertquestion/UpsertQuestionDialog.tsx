import { Dialog, DialogContent, DialogOverlay, DialogScaffold } from "~/ui/widgets/dialogmanager";
import { UpsertQuestionProvider } from "./UpsertQuestionProvider";
import { QuestionPageStore } from "../questions/QuestionPageStore";
import FilledButton from "~/ui/widgets/button/FilledButton";
import OutlinedButton from "~/ui/widgets/button/OutlinedButton";
import { useUpsertQuestionStore } from "./UpsertQuestionContext";
import { FListBoxField } from "~/ui/widgets/form/input/FListBoxField";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FFieldContainer } from "~/ui/widgets/form/input/FFieldContainer";
import { FError } from "~/ui/widgets/form/FError";
import { STT } from "~/infra/utils/stt/STT";
import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";
import { Observer } from "mobx-react-lite";
import { FCheckbox } from "~/ui/widgets/form/checkbox/FCheckbox";
import { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";
import { FTextField } from "~/ui/widgets/form/input/FTextField";
import { useEffect } from "react";
import { STTContext } from "~/ui/components/sttcontext/STTContext";


export type UpsertQuestionDialogProps = {
    id: number | null;
    parentId: number | null;
    parentStore: QuestionPageStore;
    onClose: () => void;
    stt: STT;
};


export function UpsertQuestionDialog(props: UpsertQuestionDialogProps) {
    return (
        <STTContext.Provider value={props.stt}>
            <Dialog onClose={() => { }}>
                <DialogOverlay />
                <DialogScaffold className="p-4">
                    <DialogContent className="w-full max-w-2xl h-full flex flex-col">
                        <UpsertQuestionProvider id={props.id} parentId={props.parentId} onClose={props.onClose} parentStore={props.parentStore} stt={props.stt}>
                            <Body />
                        </UpsertQuestionProvider>
                    </DialogContent>
                </DialogScaffold>
            </Dialog>
        </STTContext.Provider>
    );
}


function Body() {
    return (
        <>
            <Header />
            <Content />
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


function Content() {
    const store = useUpsertQuestionStore();
    return (
        <div className="flex flex-1 flex-col p-6 gap-4 overflow-y-auto">
            {!store.isEdit ? <QuestionTypeSelector /> : null}
            <QuestionDetailsSection />
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
                        onClick={() => store.saveQuestion()}
                    >
                        Save
                    </FilledButton>
                )}
            </Observer>
        </div>
    );
}


function QuestionTypeSelector() {
    const store = useUpsertQuestionStore();
    return (
        <FListBoxField<QuestionType | null>
            required={true}
            label="Question Type"
            placeholder="Select Question Type"
            itemKey={(item) => item!.type}
            onValueChange={(item) => store.onQuestionTypeChanged(item!)}
            itemRenderer={(item) => item!.getName(store.formType)}
            buttonRenderer={(item) => item!.getName(store.formType)}
            items={store.questionTypes}
            field={store.vm.type}
        />
    );
}


function QuestionSection() {
    const store = useUpsertQuestionStore();
    useEffect(() => {
        store.vm.addQuestionNodeListener();
        return () => {
            store.qvmState.data?.removeQuestionNodeListener();
        };
    }, [store.qvmState.data, store.vm]);

    return (
        <FFieldContainer>
            <FLabel>Question</FLabel>
            <RichPmEditor
                ref={store.vm.questionTextRef}
                placeholder="Enter Question"
                schema={blockSchema}
                stt={store.stt}
                initialContent={store.vm.questionNode}
                minHeight="80px"
                maxHeight="120px"
            />
            <FError />
            {store.vm.questionOptionsVm && store.vm.questionOptionsVm.render()}
        </FFieldContainer>
    );
}

function ScorableCheckbox() {
    const store = useUpsertQuestionStore();
    return (<Observer>
        {() => {
            if (store.vm.scorable.value.isNone) {
                return null;
            }
            return (
                <FCheckbox
                    onChange={(v) => store.vm.onChangeScorable(v)}
                    label="Scorable"
                    value={store.vm.scorable.value.boolValue!}
                />
            );
        }}
    </Observer>);
}


function MarksAndLevelSection() {
    const store = useUpsertQuestionStore();
    return (<Observer>
        {() => {
            if (store.vm.scorable.value.isNotTrue) {
                return null;
            }
            return (<div className="flex flex-row gap-4">
                <FListBoxField<QuestionLevel | null>
                    required={true}
                    className="flex-1"
                    label="Level"
                    placeholder="Select Level"
                    itemKey={(item) => (item ? item.level : "null")}
                    itemRenderer={(item) => (item ? item.name : "Select Level")}
                    buttonRenderer={(item) => (item ? item.name : "Select Level")}
                    items={QuestionLevel.values}
                    field={store.vm.level}
                    onValueChange={(value) => store.vm.onChangeLevel(value)}
                />
                <FTextField
                    label="Marks"
                    required={true}
                    placeholder="Enter Marks"
                    field={store.vm.marks}
                    type="number"
                    className="flex-1"
                />
            </div>);
        }}
    </Observer>);
}


function EnaSection() {
    const store = useUpsertQuestionStore();
    return store.vm.enaVm ? store.vm.enaVm.render() : null;
}

function HintSection() {
    const store = useUpsertQuestionStore();
    return (
        <Observer>
            {() => {
                if (store.vm.scorable.value.isNotTrue) {
                    return null;
                }
                return (
                    <FFieldContainer>
                        <FLabel>Answer Hint</FLabel>
                        <RichPmEditor
                            ref={store.vm.ansHintRef}
                            placeholder="Enter Question Text"
                            schema={blockSchema}
                            stt={store.stt}
                            initialContent={store.vm.ansHintNode}
                            minHeight="80px"
                            maxHeight="100px" />
                        <FError />
                    </FFieldContainer>
                );
            }}
        </Observer>
    );
}

function ExplanationSection() {
    const store = useUpsertQuestionStore();
    return (
        <Observer>
            {() => {
                if (store.vm.scorable.value.isNotTrue) {
                    return null;
                }
                return (
                    <FFieldContainer>
                        <FLabel>Answer Explanation</FLabel>
                        <RichPmEditor
                            ref={store.vm.ansExplanationRef}
                            placeholder="Enter Answer Explanation"
                            schema={blockSchema}
                            stt={store.stt}
                            initialContent={store.vm.ansExplanationNode}
                            minHeight="80px"
                            maxHeight="120px"
                        />
                        <FError />
                    </FFieldContainer>
                );
            }}
        </Observer>
    );
}


function RequiredCheckbox() {
    const store = useUpsertQuestionStore();
    return store.vm.isRequired.value.isNotNone ? (
        <Observer>
            {() => (
                <FCheckbox
                    onChange={(v) => store.vm.onRequiredChange(v)}
                    label="Required"
                    value={store.vm.isRequired.value.boolValue!}
                />
            )}
        </Observer>
    ) : null;
}


function QuestionDetailsSection() {
    return (
        <div className="flex flex-col gap-4">
            <ScorableCheckbox />
            <QuestionSection />
            <MarksAndLevelSection />
            <EnaSection />
            <HintSection />
            <ExplanationSection />
            <RequiredCheckbox />
        </div>
    );
}
