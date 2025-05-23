import { AppProvider } from "./AppProvider";
import { useAppBootstrap } from "./useAppBootstrap";
import "./../../ds/core/core.css";
import { Outlet } from "react-router";

export default function AppLayout() {
    const { appEnv, orgConfig, loadState } = useAppBootstrap();

    if (loadState.isInit || loadState.isLoading) {
        return <div>Loading...</div>;
    }

    if (loadState.isError) {
        return <div>Error: {loadState.error.message}</div>;
    }

    if (!appEnv || !orgConfig) {
        return <div>Unexpected error while loading app environment.</div>;
    }

    return (
        <AppProvider appEnv={appEnv} orgConfig={orgConfig}>
            <Outlet />
        </AppProvider>
    );
}
