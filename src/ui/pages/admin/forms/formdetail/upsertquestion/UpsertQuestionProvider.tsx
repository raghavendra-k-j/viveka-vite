import { Fragment, ReactNode, useEffect, useRef } from "react";
import { UpsertQuestionStore } from "./UpsertQuestionStore";
import { UpsertQuestionContext } from "./UpsertQuestionContext";
import { STT } from "~/infra/utils/stt/STT";
import { Observer } from "mobx-react-lite";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { UnknowStateView } from "~/ui/components/errors/UnknowStateView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";
import { logger } from "~/core/utils/logger";
import { FormType } from "~/domain/forms/models/FormType";
import { AdminFormsService } from "~/domain/forms/admin/services/AdminFormsService";

type UpsertQuestionProviderProps = {
    id: number | null;
    parentId: number | null;
    formId: number;
    formType: FormType;
    stt: STT;
    adminFormsService: AdminFormsService;
    onClose: () => void;
    children: ReactNode;
}

export const UpsertQuestionProvider: React.FC<UpsertQuestionProviderProps> = (props) => {
    const storeRef = useRef<UpsertQuestionStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = new UpsertQuestionStore({
            id: props.id,
            parentId: props.parentId,
            formId: props.formId,
            formType: props.formType,
            stt: props.stt,
            adminFormsService: props.adminFormsService,
            onClose: props.onClose
        });
    }
    const store = storeRef.current;
    logger.debug("UpsertQuestionProvider: render", store.instanceId);

    useEffect(() => {
        (async () => {
            await store.loadQuestion();
            logger.debug("UpsertQuestionProvider: loadQuestion completed", store.vm.instanceId);
        })();
    }, [store]);

    return (
        <UpsertQuestionContext.Provider value={storeRef.current!}>
            <Observer>
                {() => {
                    if (store.qvmState.isData) {
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
