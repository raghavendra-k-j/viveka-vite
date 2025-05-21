import { observer } from "mobx-react-lite";
import { InteractionProvider } from "./InteractionProvider";
import { AppBarView } from "./comp/AppBarView";
import { QuestionListView } from "./comp/QuestionListView";
import { LeftSidebar } from "./comp/LeftSidebar";
import { RightSidebar } from "./comp/RightSidebar";
import { MobileFooterView } from "./comp/MobileFooterView";
import { useInteractionStore } from "./InteractionContext";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";

export function InteractionFragment() {
    return (
        <InteractionProvider>
            <div className="flex flex-col h-screen overflow-hidden">
                <AppBarView />
                <ResponsiveBody />
            </div>
        </InteractionProvider>
    );
}

function ResponsiveBody() {
    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Desktop View */}
            <div className="hidden lg:flex flex-1 overflow-hidden">
                <DesktopBody />
            </div>

            {/* Mobile View */}
            <div className="flex lg:hidden flex-col flex-1 overflow-y-auto">
                <MobileBody />
            </div>
        </div>
    );
}

const DesktopBody = observer(() => {
    const store = useInteractionStore();

    if (store.vmState.isInitOrLoading) {
        return <Centered><LoaderView /></Centered>;
    }

    if (store.vmState.isError) {
        return (
            <Centered>
                <SimpleRetryableAppView
                    appError={store.vmState.error}
                    onRetry={() => store.loadQuestions()}
                />
            </Centered>
        );
    }

    return (
        <div className="flex flex-row flex-1 overflow-y-auto">
            <LeftSidebar />
            <QuestionListView />
            <RightSidebar />
        </div>
    );
});

const MobileBody = observer(() => {
    const store = useInteractionStore();

    if (store.vmState.isInitOrLoading) {
        return <Centered><LoaderView /></Centered>;
    }

    if (store.vmState.isError) {
        return (
            <Centered>
                <SimpleRetryableAppView
                    appError={store.vmState.error}
                    onRetry={() => store.loadQuestions()}
                />
            </Centered>
        );
    }

    return (
        <>
            <MobileFooterView />
            <QuestionListView />
        </>
    );
});

function Centered({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 items-center justify-center">
            {children}
        </div>
    );
}
