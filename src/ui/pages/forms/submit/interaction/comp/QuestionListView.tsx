import { observer } from "mobx-react-lite";
import { useInteractionStore } from "../InteractionContext";
import type { QuestionVm } from "../models/QuestionVm";
import styles from "./../styles.module.css";

export const QuestionListView = observer(() => {
    const store = useInteractionStore();
    const { questions } = store.vm;

    return (
        <div
            id="questions-container"
            className={`${styles.questionsContainer} h-full min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8`}>
            {questions.map((question) => (
                <QuestionItem key={question.base.id} question={question} />
            ))}
            <div className="h-10"></div>
        </div>
    );
});

const QuestionItem = observer(({ question }: { question: QuestionVm }) => {
    const isVisible = true;
    return (
        <div key={question.base.id} id={`question-${question.base.id}`}>
            {isVisible && question.render({ vm: question })}
            {isVisible && <div className="h-px my-2" />}
        </div>
    );
});
