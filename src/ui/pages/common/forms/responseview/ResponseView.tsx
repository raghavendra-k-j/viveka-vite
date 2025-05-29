import { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { FormService } from "~/domain/forms/services/FormsService";
import { ResponseViewProvider } from "./ResponseViewProvider";
import { useResponseViewStore } from "./ResponseViewContext";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { ResponseDialogViewer } from "./models/ResponseViewViewer";
import { DesktopView } from "./comp/DesktopView";
import { MobileView } from "./comp/MobileView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";
import { FramedDialog } from "~/ui/widgets/dialogmanager";

export type ResponseViewProps = {
    formId: number;
    responseUid: string;
    viewer: ResponseDialogViewer;
    formService: FormService;
    onClose: () => void;
};



export function ResponseView({ formId, responseUid, viewer, formService, onClose }: ResponseViewProps) {
    return (
        <FramedDialog
            onClose={() => {
                onClose();
            }}
            scaffoldClassName="p-0 lg:p-4"
            contentClassName="w-full h-full flex flex-col max-w-[1200px] max-h-[800px]"
        >
            <ResponseViewProvider
                formId={formId}
                responseUid={responseUid}
                viewer={viewer}
                formService={formService}
                onClose={onClose}
            >
                <ResponseBody />
            </ResponseViewProvider>
        </FramedDialog>
    );
}

function ResponseBody() {
    const store = useResponseViewStore();

    useEffect(() => {
        store.loadDetails();
    }, [store]);

    return (
        <Observer>
            {() => {
                return store.detailsState.stateWhen({
                    initOrLoading: () => <Centered><LoaderView /></Centered>,
                    error: (error: Error) => (
                        <Centered>
                            <SimpleRetryableAppView
                                appError={error}
                                onRetry={() => store.loadQuestions()}
                            />
                        </Centered>
                    ),
                    loaded: () => (
                        <>
                            <div className="hidden lg:block h-full overflow-hidden">
                                <DesktopView />
                            </div>
                            <div className="block lg:hidden  h-full">
                                <MobileView />
                            </div>
                        </>
                    ),
                });
            }
            }
        </Observer>
    );
}


function Centered({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    );
}



