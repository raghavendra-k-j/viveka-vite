import { useEffect, useRef } from "react";
import { RefStudyStore } from "./RefStudyStore";
import { InstanceId } from "~/core/utils/InstanceId";
import { logger } from "~/core/utils/logger";
import { RefStudyContext } from "./RefStudyContext";

export function RefStudyProvider({ children }: { children: React.ReactNode }) {
    const instanceId = InstanceId.generate("RefStudyProvider");
    logger.debug("Call:", instanceId);
    const refStudyStore = useRef<RefStudyStore | null>(null);
    if (!refStudyStore.current) {
        logger.debug("Creating new RefStudyStore", "Call Id:", instanceId);
        refStudyStore.current = new RefStudyStore();
    }

    useEffect(() => {
        logger.debug("RefStudyProvider mounted", "Call Id:", instanceId, "Store Id:", refStudyStore.current!.instanceId);
        return () => {
            logger.debug("RefStudyProvider unmounted", "Call Id:", instanceId, "Store Id:", refStudyStore.current!.instanceId);
        }
    });

    return (
        <RefStudyContext.Provider value={refStudyStore.current}>
            {children}
        </RefStudyContext.Provider>
    );
}