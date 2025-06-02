import { useState } from "react";
import { QuestionTypeBadge } from "~/ui/components/question/QuestionBadges";
import { RDQuestionVm } from "../../models/QuestionVm";
import { QuestionText } from "~/ui/components/form/commons/QuestionText";
import { QNumberUtil } from "~/domain/forms/utils/QNumberUtil";
import { MarksGainedBadge, UserResponseStatusView } from "./CommonBadges";
import { HintTextView } from "~/ui/components/form/commons/HintText";

function ParentQuestionToggle({ parentQuestionText }: { parentQuestionText: string }) {
    const [showParent, setShowParent] = useState(false);
    return (
        <div className="mt-2">
            <button
                type="button"
                className="text-sm text-primary underline hover:text-primary-800 focus:outline-none"
                onClick={() => setShowParent((v) => !v)}
            >
                {showParent ? "Hide Main Question" : "Show Main Question"}
            </button>
            {showParent && (
                <div className="mt-2 p-3 rounded-sm bg-slate-50 border border-default">
                    <QuestionText question={parentQuestionText} />
                </div>
            )}
        </div>
    );
}

export function QuestionHeader({ question }: { question: RDQuestionVm }) {
    return (
        <div className="pt-4 sm:pt-4 pb-1 sm:pb-2">
            <div className="flex items-center justify-between">
                <div className="text-secondary text-sm font-medium">
                    Question {QNumberUtil.getQNumber(question.qNumber, question.subQNumber)}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2">
                <div>
                    <QuestionTypeBadge type={question.type.getName(question.storeRef.formType)} />
                </div>
                <div className="flex flex-row items-center gap-2">
                    {question.marks && <MarksGainedBadge vm={question} />}
                    <UserResponseStatusView vm={question} />
                </div>
            </div>

            {question.parentQuestionText && (
                <ParentQuestionToggle parentQuestionText={question.parentQuestionText} />
            )}

            <QuestionText
                className="mt-2"
                question={question.question}
                asterisk={question.isRequired.boolValue}
                mediaFiles={question.mediaFiles}
            />
            {question.ansHint && <HintTextView className="mt-2" hint={question.ansHint} />}
        </div>
    );
}
