import { Observer } from "mobx-react-lite";
import type { GroupQuestionVm } from "../models/GroupQuestionVm";
import { QuestionCardView } from "./QuestionCardView";
import { QuestionHeaderView } from "./QuestionHeaderView";

export function GroupQuestionView({ vm }: { vm: GroupQuestionVm }) {
    return (
        <QuestionCardView>
            <QuestionHeaderView vm={vm} />
            <hr className="border-slate-200 mt-4" />
            <Observer>
                {() => (
                    <>
                        {vm.subQuestions.map((subQuestion, index) => (
                            <div key={subQuestion.base.id}>
                                {index > 0 && <hr className="border-slate-200" />}
                                {subQuestion.render({ vm: subQuestion, parentVm: vm })}
                            </div>
                        ))}
                    </>
                )}
            </Observer>
        </QuestionCardView>
    );
}
