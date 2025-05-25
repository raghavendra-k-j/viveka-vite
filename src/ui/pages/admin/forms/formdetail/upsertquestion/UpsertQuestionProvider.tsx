import { ReactNode, useEffect, useRef } from "react";
import { UpsertQuestionStore } from "./UpsertQuestionStore";
import { UpsertQuestionContext } from "./UpsertQuestionContext";
import { QuestionPageStore } from "../questions/QuestionPageStore";
import { STT } from "~/infra/utils/stt/STT";
import { Observer } from "mobx-react-lite";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { UnknowStateView } from "~/ui/components/errors/UnknowStateView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";

interface UpsertQuestionProviderProps {
    id: number | null;
    parentId: number | null;
    parentStore: QuestionPageStore;
    children: ReactNode;
    onClose: () => void;
    stt: STT;
}

export const UpsertQuestionProvider: React.FC<UpsertQuestionProviderProps> = (props) => {
    const storeRef = useRef<UpsertQuestionStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new UpsertQuestionStore({
            id: props.id,
            parentId: props.parentId,
            parentStore: props.parentStore,
            onClose: props.onClose,
            stt: props.stt,
        });
    }
    const store = storeRef.current;

    useEffect(() => {
        store.loadQuestion();
    });

    return (
        <UpsertQuestionContext.Provider value={storeRef.current!}>
            <Observer>
                {() => {
                    if (store.qvmState.isLoaded) {
                        return (<>{props.children}</>);
                    }
                    else if (store.qvmState.isInitOrLoading) {
                        return (<Centered><LoaderView /></Centered>);
                    }
                    else if (store.qvmState.isError) {
                        return (<Centered><SimpleRetryableAppView
                            appError={store.qvmState.error}
                            onRetry={() => store.loadQuestion()}
                        /></Centered>);
                    }
                    else {
                        return (<UnknowStateView />);
                    }
                }}
            </Observer>
        </UpsertQuestionContext.Provider>
    );
};


function Centered({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    );
}
