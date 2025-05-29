import clsx from "clsx";
import { MdQRenderer } from "./questionmarkit";
import { Lightbulb } from "lucide-react";

type HintTextViewProps = {
    hint: string;
    className?: string;
};

export function HintTextView({ hint, className }: HintTextViewProps) {
    return (
        <div
            className={clsx(
                "bg-teal-50 rounded-md px-3 py-2 text-teal-900 space-y-2",
                className
            )}
        >
            {/* First row: icon + label */}
            <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-teal-900" />
                <span className="font-semibold text-sm">Hint</span>
            </div>

            {/* Second row: hint content */}
            <div
                className="text-base-m"
                dangerouslySetInnerHTML={{ __html: MdQRenderer.hint(hint) }}
            />
        </div>
    );
}
