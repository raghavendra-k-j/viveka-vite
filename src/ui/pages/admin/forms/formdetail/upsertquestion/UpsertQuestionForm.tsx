import { useUpsertQuestionStore } from "./UpsertQuestionContext";
import { FListBoxField } from "~/ui/widgets/form/input/FListBoxField";
import { FLabel } from "~/ui/widgets/form/FLabel";
import { FFieldContainer } from "~/ui/widgets/form/input/FFieldContainer";
import { FError } from "~/ui/widgets/form/FError";
import FilledButton from "~/ui/widgets/button/FilledButton";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { logger } from "~/core/utils/logger";
import { useEffect } from "react";
import { Observer } from "mobx-react-lite";

export function UpsertQuestionForm() {
    const store = useUpsertQuestionStore();
    return (
        <div className="flex flex-1 flex-col p-6 gap-4 overflow-y-auto">
            {!store.isEdit && <QuestionTypeSelector />}
            <Observer>
                {() => {
                    return (
                        <>
                            <QuestionDetailsSection />
                        </>
                    );
                }}
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

function QuestionDetailsSection() {
    return (
        <div className="flex flex-col gap-4">
            <QuestionSection />
        </div>
    );
}



function QuestionSection() {
    const store = useUpsertQuestionStore();

    const onPrintClicked = (from: string) => {
        logger.debug("onPrintClicked Called from", from, JSON.stringify({
            "store.vm.instanceId": store.vm.instanceId,
            "store.vm.questionTextRef.current?.instanceId": store.vm.questionTextRef.current?.instanceId,
            "questionText": store.vm.questionTextRef.current?.getContent(),
        }));
    }


    useEffect(() => {
        onPrintClicked("useEffect");
    });

    return (
        <>
            <FFieldContainer>
                <FLabel>Question</FLabel>
                <RichPmEditor
                    ref={store.vm.questionTextRef}
                    placeholder="Enter Question"
                    schema={blockSchema}
                    stt={store.stt}
                    onChange={(node, instanceId) => {
                        logger.debug("onChange", JSON.stringify({
                            "vm.instanceId": store.vm.instanceId,
                            "instanceId": instanceId,
                            "node": node.toJSON(),
                        }));
                    }}
                    minHeight="80px"
                    maxHeight="120px"
                />
                <FError />
            </FFieldContainer>
            <FilledButton onClick={() => onPrintClicked("Button Click")}>Print Question</FilledButton>
        </>
    );
}
