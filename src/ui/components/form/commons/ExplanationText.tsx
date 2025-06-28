import { useState } from "react";
import { ExplanationText } from "./QuestionText";

type QuestionExplanationViewProps = {
    explanation: string;
    className?: string;
};

export function QuestionExplanationView(props: QuestionExplanationViewProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`flex flex-col gap-1 ${props.className}`}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="text-base-m underline font-medium text-teal-700 hover:underline"
                >
                    {isExpanded ? "Hide Explanation" : "Show Explanation"}
                </button>
            </div>

            {isExpanded && (
                <div>
                    <ExplanationText text={props.explanation} />
                </div>
            )}
        </div>
    );
}
