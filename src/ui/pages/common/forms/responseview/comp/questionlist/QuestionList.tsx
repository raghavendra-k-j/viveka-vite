import { Observer } from "mobx-react-lite";
import { useResponseViewStore } from "../../ResponseViewContext";
import { HeaderView } from "./HeaderView";
import { RDQuestionVm } from "../../models/QuestionVm";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";
import { QuestionCard } from "../questionview/QuestionCard";
import { QuestionHeader } from "../questionview/QuestionHeaderView";
import { QuestionExplanationView } from "~/ui/components/form/commons/ExplanationText";

export function QuestionList() {
    return (
        <>
            <HeaderView />
            <Body />
        </>
    );
}

function Body() {
    const store = useResponseViewStore();

    return (
        <div className="flex-1 overflow-y-auto bg-background">
            <Observer>
                {() =>
                    store.questionState.stateWhen({
                        initOrLoading: () => (
                            <Centered>
                                <LoaderView />
                            </Centered>
                        ),
                        error: (error) => (
                            <Centered>
                                <SimpleRetryableAppView
                                    appError={error}
                                    onRetry={() => store.loadQuestions()}
                                />
                            </Centered>
                        ),
                        loaded: () => (
                            <div className="flex flex-col gap-2 p-4">
                                <ListView />
                            </div>
                        ),
                    })
                }
            </Observer>
        </div>
    );
}

function Centered({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    );
}

function ListView() {
    const store = useResponseViewStore();
    return (
        <div className="flex flex-col gap-4">
            {store.questions.map((q, idx) => (
                <QuestionView key={idx} question={q} />
            ))}
        </div>
    );
}

type QuestionViewProps = {
    question: RDQuestionVm;
};

function QuestionView({ question }: QuestionViewProps) {
    const renderer = question.storeRef.renderers[question.type.type];
    return (
        <QuestionCard>
            <QuestionHeader question={question} />
            {renderer?.(question)}
            {question.ansExplanation && (
                <QuestionExplanationView className="pt-2 pb-4" explanation={question.ansExplanation} />
            )}
        </QuestionCard>
    );
}
