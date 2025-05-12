import { Observer } from "mobx-react-lite";
import type { TextAreaQuestionVm } from "../models/TextAreaQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { ListenButton } from "./ListenButton";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";

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

function TextAreaInput({ vm }: { vm: TextAreaQuestionVm }) {
    return (
        <div className="flex flex-row px-4 py-4 gap-4">
            <Observer>
                {() => (
                    <textarea
                        className="text-sm flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-default placeholder-gray-400"
                        placeholder="Type your answer here..."
                        value={vm.ansStr}
                        rows={3}
                        onChange={(e) => vm.onAnsStrChanged(e.target.value)}
                    />
                )}
            </Observer>
            <ListenButton
                stt={vm.base.store.parentStore.stt}
                onResult={(str) => vm.onAnsStrChanged(str)}
            />
        </div>
    );
}
