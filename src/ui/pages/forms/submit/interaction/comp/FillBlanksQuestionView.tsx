import { observer } from "mobx-react-lite";
import type { FillBlanksQuestionVm } from "../models/FillBlanksQuestionVm";
import { FillBlankItemVm } from "../models/FillBlanksQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { ListenButton } from "./ListenButton";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";

type FillBlanksQuestionViewProps = {
    vm: FillBlanksQuestionVm;
    parentVm?: GroupQuestionVm;
};

export const FillBlanksQuestionView = observer(({ vm, parentVm }: FillBlanksQuestionViewProps) => {
    return (
        <QuestionCardView parent={parentVm}>
            <QuestionHeaderView vm={vm} />
            <div className="space-y-4 px-4 py-4">
                {vm.items.map((item, index) => (
                    <FillBlankInputView
                        key={item.input.id}
                        vm={vm}
                        itemVm={item}
                        total={vm.items.length}
                        index={index + 1}
                    />
                ))}
            </div>
        </QuestionCardView>
    );
});

type InputProps = {
    vm: FillBlanksQuestionVm;
    itemVm: FillBlankItemVm;
    total: number;
    index: number;
};

const FillBlankInputView = observer(({ vm, itemVm, total, index }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    className="flex-1 text-base-m w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary textdefault placeholder-gray-400"
                    placeholder={`Answer ${index} of ${total}`}
                    value={itemVm.ansStr}
                    onChange={(e) => vm.onAnsStrChanged(itemVm, e.target.value)}
                />
                <ListenButton
                    stt={vm.base.store.parentStore.stt}
                    onResult={(str) => vm.onAnsStrChanged(itemVm, str)}
                />
            </div>
        </div>
    );
});
