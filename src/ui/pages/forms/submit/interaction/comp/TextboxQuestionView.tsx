import { Observer } from "mobx-react-lite";
import type { TextboxQuestionVm } from "../models/TextboxQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { ListenButton } from "./ListenButton";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";


type TextboxQuestionViewProps = {
    vm: TextboxQuestionVm;
    parentVm?: GroupQuestionVm;
}

export function TextboxQuestionView({ vm, parentVm }: TextboxQuestionViewProps) {
    return (
        <QuestionCardView parent={parentVm} >
            <QuestionHeaderView vm={vm} />
            <TextInput vm={vm} />
        </QuestionCardView>
    );
}


function TextInput({ vm }: { vm: TextboxQuestionVm }) {
    return (
        <div className="flex flex-row px-4 py-4 gap-4">
            <Observer>
                {() => (<input
                    type="text"
                    className="text-sm flex-1 w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-default placeholder-gray-400"
                    placeholder="Type your answer here..."
                    value={vm.ansStr}
                    onChange={(e) => vm.onAnsStrChanged(e.target.value)}
                />)}
            </Observer>
            <ListenButton stt={vm.base.store.parentStore.stt} onResult={(str) => vm.onAnsStrChanged(str)} />
        </div>
    );
}