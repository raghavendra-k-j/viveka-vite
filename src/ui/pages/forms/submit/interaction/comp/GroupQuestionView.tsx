import { Observer } from "mobx-react-lite";
import type { GroupQuestionVm } from "../models/GroupQuestionVm";
import { QuestionCardView } from "./QuestionCardView";
import { QuestionHeaderView } from "./QuestionHeaderView";

export function GroupQuestionView({ vm }: { vm: GroupQuestionVm }) {
    return (
        <QuestionCardView>
            <QuestionHeaderView
                vm={vm}
                parentVm={undefined}
            />
            <hr className="border-default mt-4" />
            <Observer>
                {() => (
                    <>
                        {vm.subQuestions.map((subQuestion, index) => (
                            <div
                                id={`question-${subQuestion.base.id}`}
                                key={subQuestion.base.id}
                            >
                                {index > 0 && <hr className="border-default" />}
                                {subQuestion.render({ vm: subQuestion, parentVm: vm })}
                            </div>
                        ))}
                    </>
                )}
            </Observer>
        </QuestionCardView>
    );
}
