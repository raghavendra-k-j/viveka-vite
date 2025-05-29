import "katex/dist/katex.min.css";
import { MdQRenderer } from "./questionmarkit";

export type QuestionTextProps = {
    asterisk?: boolean | null;
    question: string;
    className?: string;
};

export function QuestionText(props: QuestionTextProps) {
    return (
        <div className={`text-default font-medium text-base-m flex flex-row ${props.className}`}>
            <span dangerouslySetInnerHTML={{ __html: MdQRenderer.question(props.question) }} />
            {props.asterisk ? <span className="text-error ml-1">*</span> : null}
        </div>
    );
}

export function ExplanationText(props: { text: string }) {
    return (
        <div className="text-base-m text-default text-default" dangerouslySetInnerHTML={{ __html: MdQRenderer.explanation(props.text) }} />
    );
}


