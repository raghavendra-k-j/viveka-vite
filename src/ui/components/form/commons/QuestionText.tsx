import { questionMarkIt } from "./questionmarkit";

export type QuestionTextProps = {
    number?: string | null;
    asterisk?: boolean | null;
    question: string;
    className?: string;
};

export function QuestionText(props: QuestionTextProps) {
    return (
        <div className={`text-default text-sm font-medium ${props.className}`}>
            {props.asterisk && <span className="text-red-600 mr-1">*</span>}
            {props.number && <span className="mr-0.5">Q{props.number}. </span>}
            <span dangerouslySetInnerHTML={{ __html: questionMarkIt.renderInline(props.question) }} />
        </div>
    );
}

export function ChoiceText(props: { text: string }) {
    return (
        <span dangerouslySetInnerHTML={{ __html: questionMarkIt.renderInline(props.text) }} />
    );
}

export function PairMatchRowText(props: { text: string }) {
    return (
        <span dangerouslySetInnerHTML={{ __html: questionMarkIt.renderInline(props.text) }} />
    );
}


