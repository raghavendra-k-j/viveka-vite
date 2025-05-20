import type { TextAreaQuestionVm } from "../models/TextAreaQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";
import { RichEditor } from "~/ui/components/richeditor/RichEditor";
import { RichMdEditor } from "~/ui/components/richmdeditor/RichMdEditor";
import RichPmEditor from "~/ui/components/richpmeditor/RichPmEditor";

type TextAreaQuestionViewProps = {
    vm: TextAreaQuestionVm;
    parentVm?: GroupQuestionVm;
};


export function TextAreaQuestionView({ vm, parentVm }: TextAreaQuestionViewProps) {
    return (
        <QuestionCardView parent={parentVm} >
            <QuestionHeaderView vm={vm} />
            <TextAreaInput vm={vm} />
        </QuestionCardView>
    );
}


// function TextAreaInput({ vm }: { vm: TextAreaQuestionVm }) {
//     return (
//         <div className="flex flex-row px-4 py-4 gap-4">
//             <RichEditor stt={vm.base.store.parentStore.stt} />
//         </div>
//     );
// }



function TextAreaInput({ vm }: { vm: TextAreaQuestionVm }) {
    return (
        <div className="flex flex-row px-4 py-4 gap-4">
            <RichPmEditor />
        </div>
    );
}