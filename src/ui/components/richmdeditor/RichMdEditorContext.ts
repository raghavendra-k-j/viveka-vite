import { createContext, useContext } from "react";
import { RichMdEditorStore } from "./RichMdEditorStore";

export const RichMdEditorContext = createContext<RichMdEditorStore | null>(null);

export const useRichMdEditorStore = () => {
    const store = useContext(RichMdEditorContext);
    if (!store) {
        throw new Error("useRichMdEditorStore must be used within a RichMdEditorProvider");
    }
    return store;
};
