import { QuestionTypeBadge } from "~/ui/components/question/QuestionBadges";
import { RDQuestionVm } from "../../models/QuestionVm";
import { QuestionText } from "~/ui/components/form/commons/QuestionText";
import { QNumberUtil } from "~/domain/forms/utils/QNumberUtil";

export function QuestionHeader({ question }: { question: RDQuestionVm }) {
    return (
        <div>
            <div className="px-3 pt-2 pb-1 flex flexr-row items-center gap-2 justify-between">
                <div>
                    <QuestionTypeBadge type={question.type.getName(question.storeRef.formType)} />
                </div>
                <div>
                </div>
            </div>
            <QuestionText number={QNumberUtil.getQNumber(question.qNumber, question.subQNumber)} className="px-3 pt-1 pb-2" question={question.question} asterisk={question.isRequired.boolValue} />
        </div>
    );
}