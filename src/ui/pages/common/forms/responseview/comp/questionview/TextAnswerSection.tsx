import { MdQRenderer } from "~/ui/components/form/commons/questionmarkit";

export function TextAnswerSection({
    prefix,
    text,
    isTextArea,
    colorClass,
}: {
    prefix: string;
    text?: string;
    isTextArea: boolean;
    colorClass: string;
}) {
    const html = isTextArea ? MdQRenderer.blockTextAnswer(text || "") : MdQRenderer.inlineTextAnswer(text || "");
    return (
        <div className="bg-slate-50 rounded-sm px-3 py-2">
            <div className={`text-sm font-semibold  ${colorClass}`}>{prefix}</div>
            {text && <div className="text-base-m" dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
    );
}
