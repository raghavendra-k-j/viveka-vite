import { observer } from "mobx-react-lite";
import { AppBar } from "../comp/AppBar";
import { QuestionListView } from "./QuestionListView";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { TimerView } from "./comp/TimerView";
import AppBarLogo from "~/ui/components/AppBarLogo";
import { InteractionProvider } from "./InteractionProvider";
import { useInteractionStore } from "./InteractionContext";
import { PageLoader } from "~/ui/components/loaders/PageLoader";


export function InteractionFragment() {
    return (
        <InteractionProvider>
            <div>
                <AppBarView />
                <Body />
            </div>
        </InteractionProvider>
    );
}


const AppBarView = observer(() => {
    const store = useInteractionStore();

    return (
        <AppBar
            leading={<AppBarLogo />}
            trailing={
                store.vmState.isLoaded && store.hasTimeLimit
                    ? <TimerView />
                    : null
            }
        />
    );
});



const Body = observer(() => {
    const store = useInteractionStore();

    if (store.vmState.isInit || store.vmState.isLoading) {
        return <PageLoader />;
    }

    if (store.vmState.isError) {
        return <div>{store.vmState.error?.message}</div>;
    }

    return (
        <div className="flex flex-row gap-4">
            <LeftPanel />
            <QuestionListView />
            <RightPanel />
        </div>
    );
});

