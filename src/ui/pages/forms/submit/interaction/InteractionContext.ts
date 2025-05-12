import { createContext, useContext } from "react";
import { InteractionStore } from "./InteractionStore";

export const InteractionContext = createContext<InteractionStore | null>(null);

export const useInteractionStore = () => {
    const store = useContext(InteractionContext);
    if (!store) {
        throw new Error("useInteractionStore must be used within an InteractionProvider");
    }
    return store;
}
