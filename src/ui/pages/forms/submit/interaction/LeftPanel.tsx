import { ReadMoreText } from "~/ui/widgets/text/ReadMoreText";
import { useInteractionStore } from "./InteractionContext";
import { Asterisk } from "lucide-react";

export const LeftPanel = () => {
    const store = useInteractionStore();
    const { title, description } = store.vm.formDetail;

    return (
        <div className="bg-surface max-w-[300px] border-r shadow-sm border-slate-200 p-4 flex flex-col gap-4 h-full overflow-y-auto">
            <div className="flex flex-col gap-2">
                <ReadMoreText text={title} className="text-10xs font-semibold text-default" />
                {description && (
                    <ReadMoreText text={description || ""} className="text-sm text-secondary" />
                )}
            </div>

            <div className="flex items-start gap-2 bg-sky-50 border border-sky-200 text-sky-800 p-3 rounded-md text-sm">
                <div className="flex items-center justify-center min-w-6 min-h-6 bg-sky-200 rounded-sm">
                    <Asterisk size={16} className="mt-0.5 shrink-0" />
                </div>
                <span className="font-medium leading-snug">
                    Please answer all questions marked with <strong>*</strong>.
                </span>
            </div>
        </div>
    );
};
