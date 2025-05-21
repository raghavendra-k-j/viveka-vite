import { useState } from "react";
import { ExplanationText } from "./QuestionText";

type QuestionExplanationViewProps = {
    explanation: string;
    className?: string;
};

export function QuestionExplanationView(props: QuestionExplanationViewProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="px-4 py-2">
            <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="text-sm underline font-medium text-teal-800 hover:underline"
            >
                {isExpanded ? "Hide Explanation" : "Show Explanation"}
            </button>

            {isExpanded && (
                <div className="pt-1 pb-2 text-sm text-default">
                    <ExplanationText text={props.explanation} />
                </div>
            )}
        </div>
    );
}
