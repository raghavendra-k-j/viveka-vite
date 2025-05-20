import { observer } from "mobx-react-lite";
import { QuestionListView } from "./comp/QuestionListView";
import { LeftSidebar } from "./comp/LeftSidebar";
import { RightSidebar } from "./comp/RightSidebar";
import { InteractionProvider } from "./InteractionProvider";
import { useInteractionStore } from "./InteractionContext";
import { AppBarView } from "./comp/AppBarView";
import { SimpleRetryableAppView } from "~/ui/widgets/error/SimpleRetryableAppError";
import { LoaderView } from "~/ui/widgets/loader/LoaderView";

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
            <div className="hidden lg:flex flex-1 flex-row max-h-[100%] overflow-hidden border-4 border-red-500">
                <DesktopBody />
            </div>
            <div className="flex lg:hidden h-full overflow-y-auto">
                <MobileBody />
            </div>
        </div>
    );
}

function MobileBody() {
    return (<div>A Long Text On Mobile</div>);
}



function Centered({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 items-center justify-center">
            {children}
        </div>
    );
}

const DesktopBody = observer(() => {
    const store = useInteractionStore();

    if (store.vmState.isInitOrLoading) {
        return <Centered><LoaderView /></Centered>;
    }

    if (store.vmState.isError) {
        return <Centered><SimpleRetryableAppView appError={store.vmState.error} onRetry={() => store.loadQuestions()} /></Centered>;
    }

    return (
        <div className="flex flex-col flex-1">
            <QuestionListView/>
        </div>
    );
});






// const Body = observer(() => {
//     const store = useInteractionStore();

//     if (store.vmState.isInit || store.vmState.isLoading) {
//         return <PageLoader />;
//     }

//     if (store.vmState.isError) {
//         return <div>{store.vmState.error?.message}</div>;
//     }

//     return (
//         <div className="flex flex-1 overflow-hidden">
//             <div className="hidden xl:block">
//                 <LeftSidebar />
//             </div>

//             <div className="flex-1 overflow-hidden">
//                 <QuestionListView />
//             </div>

//             <div className="hidden xl:block">
//                 <RightSidebar />
//             </div>

//             <div className="xl:hidden">
//                 <MobileFooterView />
//             </div>
//         </div>
//     );
// });


