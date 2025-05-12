import React, { useState } from "react";

type ReadMoreTextProps = React.HTMLAttributes<HTMLSpanElement> & {
    text: string;
    maxChars?: number;
    readMoreColor?: string;
};

export function ReadMoreText({
    text,
    maxChars = 120,
    readMoreColor = "text-primary",
    ...rest
}: ReadMoreTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const isLong = text.length > maxChars;
    const displayText = isExpanded || !isLong
        ? text
        : text.slice(0, maxChars) + "... ";

    return (
        <span {...rest}>
            {displayText}
            {isLong && (
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`${readMoreColor} hover:underline cursor-pointer font-semibold`}
                >
                    {isExpanded ? "Read less" : "Read more"}
                </button>
            )}
        </span>
    );
}
