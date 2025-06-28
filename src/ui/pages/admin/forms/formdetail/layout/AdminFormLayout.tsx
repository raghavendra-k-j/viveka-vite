import React, { useRef } from "react";
import { Outlet, useParams } from "react-router";
import { AdminFormProvider } from "./AdminFormProvider";
import { AdminFormStore } from "./AdminFormStore";
import { Observer } from "mobx-react-lite";
import { useAdminFormStore } from "./AdminFormContext";
import { PageLoader } from "~/ui/components/loaders/PageLoader";
import { STTProvider } from "~/ui/components/sttcontext/STTProvider";
import { useStt } from "~/ui/components/sttcontext/STTContext";

const AdminFormLayout: React.FC = () => {
    return (
        <STTProvider>
            <AdminFormLayoutInner />
        </STTProvider>
    );
};

const AdminFormLayoutInner: React.FC = () => {
    const stt = useStt();
    const { permalink } = useParams<{ permalink: string }>();
    const store = useRef<AdminFormStore | null>(null);

    if (store.current === null) {
        store.current = new AdminFormStore({
            permalink: permalink || "",
            stt: stt,
        });
    }

    return (
        <AdminFormProvider store={store.current}>
            <Body />
        </AdminFormProvider>
    );
};

export default AdminFormLayout;


export function Body() {
    const store = useAdminFormStore();

    return (
        <Observer>
            {() => {
                return store.fdState.stateWhen({
                    initOrLoading: () => <PageLoader />,
                    error: () => <div>Error loading form details</div>,
                    loaded: () => {
                        return (
                            <Main />
                        );
                    },
                });

            }}
        </Observer>
    );
}

function Main() {
    return (<Outlet />);
}