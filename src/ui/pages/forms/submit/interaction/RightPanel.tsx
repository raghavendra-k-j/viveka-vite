import { Observer, observer } from "mobx-react-lite";
import { useInteractionStore } from "./InteractionContext";
import type { GroupQuestionVm } from "./models/GroupQuestionVm";
import type { QuestionVm } from "./models/QuestionVm";
import { useMemo } from "react";
import FilledButton from "~/ui/widgets/button/FilledButton";

const QuestionListRow = observer(
    ({ label, vm }: { label: string; vm: QuestionVm }) => {
        const isAnswered = vm.isAnswered;
        return (
            <div>
                <div>
                    {label}
                </div>
            </div>
        );
    }
);





export const RightPanel = observer(() => {
    return (
        <div>
            <QuestionPanelHeader />
            <QuestionPanelContent />
            <QuestionPanelFooter />
        </div>
    );
});

const QuestionPanelHeader = () => {
    return (
        <>
            <div>Questions</div>
            <div>
                <div>
                    <div />
                    <span>Answered</span>
                </div>
                <div>
                    <div />
                    <span>Unanswered</span>
                </div>
            </div>
        </>
    );
};


const QuestionPanelContent = observer(() => {
    const store = useInteractionStore();
    const { questions } = store;
    const acutalQuestions = useMemo(() => {
        const list = [];
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (q.base.type.isGroup) {
                const groupVm = q as GroupQuestionVm;
                if (groupVm.subQuestions && groupVm.subQuestions.length > 0) {
                    list.push(q);
                }
            } else {
                list.push(q);
            }
        }
        return list;
    }, [questions]);

    return (
        <div>
            {acutalQuestions.map((q) => {
                const label = q.base.id.toString();
                return (
                    <QuestionListRow
                        key={q.base.id}
                        label={label}
                        vm={q}
                    />
                );
            })}
        </div>
    );
});


const QuestionPanelFooter = () => {
    const store = useInteractionStore();
    return (
        <Observer>
            {() => {
                return (
                    <div>
                        <FilledButton onClick={() => store.onClickSubmitForm()}>Submit</FilledButton>
                    </div>
                );
            }}
        </Observer>
    );
};
