import { ReactNode, useEffect, useMemo } from "react";
import { SubmitContext } from "./SubmitContext";
import { SubmitStore } from "./SubmitStore";
import { useAppStore } from "../../_layout/AppContext";
import { logger } from "~/core/utils/logger";


type SubmitProviderProps = {
    permalink: string;
    children: ReactNode;
}

export function SubmitProvider(props: SubmitProviderProps) {
    const appContext = useAppStore();
    const submitStore = useMemo(() => new SubmitStore({
        permalink: props.permalink,
        appStore: appContext,
    }), [props.permalink, appContext]);

    useEffect(() => {
        submitStore.loadFormDetail();
    });

    return (
        <SubmitContext.Provider value={submitStore}>
            {props.children}
        </SubmitContext.Provider>
    );
}

