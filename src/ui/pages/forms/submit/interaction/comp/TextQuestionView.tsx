import type { TextQuestionVm } from "../models/TextQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";
import { blockSchema, inlineSchema } from "~/ui/components/richpmeditor/pm/schema";
import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";

type TextQuestionViewProps = {
    vm: TextQuestionVm;
    parentVm?: GroupQuestionVm;
};


export function TextQuestionView({ vm, parentVm }: TextQuestionViewProps) {
    return (
        <QuestionCardView parent={parentVm} >
            <QuestionHeaderView vm={vm} parentVm={parentVm} />
            <TextQuestionInput vm={vm} />
        </QuestionCardView>
    );
}


function TextQuestionInput({ vm }: { vm: TextQuestionVm }) {
    return (
        <div className="flex flex-row px-4 py-4 gap-4">
            <RichPmEditor
                schema={vm.isMultiline ? blockSchema : inlineSchema}
                onChange={(node) => vm.onAnsStrChanged(node)}
                placeholder="Type here..."
                stt={vm.base.store.parentStore.stt}
                minHeight={vm.isMultiline ? "80px" : ""}
                maxHeight="200px"
            />
        </div>
    );
}