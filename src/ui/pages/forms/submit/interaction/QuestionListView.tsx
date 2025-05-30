import { observer } from "mobx-react-lite";
import { useInteractionStore } from "./InteractionContext";
import type { QuestionVm } from "./models/QuestionVm";


export const QuestionListView = observer(() => {
    const store = useInteractionStore();
    const { questions } = store.vm;

    return (
        <div className="flex-1 py-4">
            {questions.map((question) => (
                <QuestionItem key={question.base.id} question={question} />
            ))}
        </div>
    );
});


const QuestionItem = observer(({ question }: { question: QuestionVm }) => {
    const isVisible = true;
    return (
        <div key={question.base.id}>
            {isVisible && question.render({ vm: question })}
            {isVisible && <div className="h-px my-2" />}
        </div>
    );
});