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
import { Dialog, DialogContent, DialogOverlay, DialogScaffold } from "~/ui/widgets/dialogmanager";

export type ResponseViewProps = {
    formId: number;
    responseUid: string;
    viewer: ResponseDialogViewer;
    formService: FormService;
    onClose: () => void;
};

export function ResponseView({ formId, responseUid, viewer, formService, onClose }: ResponseViewProps) {
    return (
        <Dialog>
            <DialogOverlay />
            <DialogScaffold className="p-4">
                <DialogContent className="w-full h-full flex flex-col">
                    <ResponseViewProvider
                        formId={formId}
                        responseUid={responseUid}
                        viewer={viewer}
                        formService={formService}
                        onClose={onClose}
                    >
                        <ResponseBody />
                    </ResponseViewProvider>
                </DialogContent>
            </DialogScaffold>
        </Dialog>
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



