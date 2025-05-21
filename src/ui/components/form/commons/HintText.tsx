import clsx from "clsx";
import { MdQRenderer } from "./questionmarkit";

type HintTextViewProps = {
    hint: string;
    className?: string;
};

export function HintTextView({ hint, className }: HintTextViewProps) {
    return (
        <div
            className={clsx(
                "bg-teal-50 rounded-md px-3 py-2 text-sm text-teal-900",
                className
            )}
        >
            <span className="font-semibold mr-1">Hint:</span>
            <span dangerouslySetInnerHTML={{ __html: MdQRenderer.hint(hint) }} />
        </div>
    );
}
