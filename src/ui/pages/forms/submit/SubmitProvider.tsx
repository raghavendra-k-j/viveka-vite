import { ReactNode, useMemo } from "react";
import { SubmitContext } from "./SubmitContext";
import { SubmitStore } from "./SubmitStore";


type SubmitProviderProps = {
    permalink: string;
    children: ReactNode;
}

export function SubmitProvider(props: SubmitProviderProps) {
    const submitStore = useMemo(() => new SubmitStore({ permalink: props.permalink }), [props.permalink]);
    return (
        <SubmitContext.Provider value={submitStore}>
            {props.children}
        </SubmitContext.Provider>
    );
}

