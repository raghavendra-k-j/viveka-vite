import { ReadMoreText } from "~/ui/widgets/text/ReadMoreText";
import { useInteractionStore } from "../InteractionContext";

export const FormDetailSection = () => {
    const store = useInteractionStore();
    const { title, description } = store.vm.formDetail;

    return (
        <div className="flex flex-col gap-2">
            <ReadMoreText text={title} className="text-base font-semibold text-default" />
            {description && (
                <ReadMoreText text={description} className="text-sm text-secondary" />
            )}
        </div>
    );
};


export const InfoBox = () => (
    <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 p-3 rounded text-sm">
        <span className="font-medium leading-snug">
            Please answer all questions marked with <strong className="text-red-500">*</strong>
        </span>
    </div>
);