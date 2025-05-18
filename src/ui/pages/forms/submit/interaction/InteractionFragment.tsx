import { observer } from "mobx-react-lite";
import { QuestionListView } from "./comp/QuestionListView";
import { LeftSidebar } from "./comp/LeftSidebar";
import { RightSidebar } from "./comp/RightSidebar";
import { InteractionProvider } from "./InteractionProvider";
import { useInteractionStore } from "./InteractionContext";
import { PageLoader } from "~/ui/components/loaders/PageLoader";
import { AppBarView } from "./comp/AppBarView";
import { MobileFooterView } from "./comp/MobileFooterView";

export function InteractionFragment() {
    return (
        <InteractionProvider>
            <div className="flex flex-col h-screen">
                <AppBarView />
                <Body />
            </div>
        </InteractionProvider>
    );
}






const Body = observer(() => {
    const store = useInteractionStore();

    if (store.vmState.isInit || store.vmState.isLoading) {
        return <PageLoader />;
    }

    if (store.vmState.isError) {
        return <div>{store.vmState.error?.message}</div>;
    }

    return (
        <div className="flex flex-1 flex-col xl:flex-row overflow-hidden">
            <div className="hidden xl:block">
                <LeftSidebar />
            </div>

            <div className="flex-1 overflow-auto">
                <QuestionListView />
            </div>

            <div className="hidden xl:block">
                <RightSidebar />
            </div>

            <div className="xl:hidden">
                <MobileFooterView />
            </div>
        </div>
    );
});


