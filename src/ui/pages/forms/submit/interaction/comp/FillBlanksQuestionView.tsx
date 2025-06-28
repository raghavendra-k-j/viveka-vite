import type { FillBlanksQuestionVm } from "../models/FillBlanksQuestionVm";
import { FillBlankItemVm } from "../models/FillBlanksQuestionVm";
import { QuestionHeaderView } from "./QuestionHeaderView";
import { QuestionCardView } from "./QuestionCardView";
import { GroupQuestionVm } from "../models/GroupQuestionVm";
import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";
import { inlineSchema } from "~/ui/components/richpmeditor/pm/schema";

type FillBlanksQuestionViewProps = {
    vm: FillBlanksQuestionVm;
    parentVm?: GroupQuestionVm;
};

export const FillBlanksQuestionView = ({ vm, parentVm }: FillBlanksQuestionViewProps) => {
    return (
        <QuestionCardView parent={parentVm}>
            <QuestionHeaderView vm={vm} parentVm={parentVm} />
            <div className="space-y-4 px-4 py-4">
                {vm.items.map((item, index) =>
                    index > 10 ? null : (
                        <FillBlankInputView
                            key={item.input.id}
                            vm={vm}
                            itemVm={item}
                            position={index + 1}
                        />
                    )
                )}
            </div>
        </QuestionCardView>
    );
};

type InputProps = {
    vm: FillBlanksQuestionVm;
    itemVm: FillBlankItemVm;
    position: number;
};

const FillBlankInputView = ({ vm, itemVm, position: index }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <RichPmEditor
                    schema={inlineSchema}
                    onChange={(node) => vm.onAnsStrChanged(itemVm, node)}
                    placeholder={`Fill up answer ${index}`}
                    stt={vm.base.store.parentStore.stt}
                />
            </div>
        </div>
    );
};
