import { observer } from "mobx-react-lite";
import { InteractionProvider } from "./InteractionProvider";
import { AppBarView } from "./comp/AppBarView";
import { QuestionListView } from "./comp/QuestionListView";
import { LeftSidebar } from "./comp/LeftSidebar";
import { RightSidebar } from "./comp/RightSidebar";
import { MobileTopBar } from "./comp/MobileTopBar";
import { useInteractionStore } from "./InteractionContext";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";
import { useMediaQuery } from 'react-responsive';
import { mediaQueries } from "~/ui/utils/breakpoints";


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
    const isMobile = useMediaQuery({ query: mediaQueries.isMobile });
    return isMobile ? <MobileBody /> : <DesktopBody />;
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
        <div key={store.vm.thingId} className="flex flex-row flex-1 min-h-0">
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
        <div key={store.vm.thingId} className="flex flex-col h-full min-h-0">
            <MobileTopBar />
            <QuestionListView />
        </div>
    );
});

function Centered({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 items-center justify-center">
            {children}
        </div>
    );
}
