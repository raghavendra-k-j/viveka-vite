import { createContext, useContext } from "react";
import { QMediaPickerStore } from "./QMediaPickerStore";

export const QMediaPickerContext = createContext<QMediaPickerStore | null>(null);

export const useQMediaPickerStore = () => {
    const context = useContext(QMediaPickerContext);
    if (!context) {
        throw new Error("useQMediaPickerStore must be used within a QMediaPickerProvider");
    }
    return context;
}