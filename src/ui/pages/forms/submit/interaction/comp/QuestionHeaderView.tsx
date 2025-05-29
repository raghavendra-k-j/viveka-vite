import type { QuestionVm } from "../models/QuestionVm";
import { SpeakButton } from "./SpeakButton";
import { MarksBadge, QuestionTypeBadge } from "~/ui/components/question/QuestionBadges";
import { NumFmt } from "~/core/utils/NumFmt";
import { QNumberUtil } from "~/domain/forms/utils/QNumberUtil";
import { QuestionText } from "~/ui/components/form/commons/QuestionText";
import { HintTextView } from "~/ui/components/form/commons/HintText";
import { QuestionErrorMessage } from "./QuestionErrorMessage";



type QuestionHeaderProps = {
  vm: QuestionVm;
  parentVm: QuestionVm | undefined;
}

export const QuestionHeaderView = (props: QuestionHeaderProps) => {
  let qNumberText = "";
  if (!props.parentVm) {
    qNumberText = `Question ${QNumberUtil.getQNumber(props.vm.base.dOrder)} of ${props.vm.base.store.totalQuestions}`;
  }
  else {
    qNumberText = `Question ${QNumberUtil.getQNumber(props.parentVm.base.dOrder, props.vm.base.dOrder)} of ${props.parentVm.base.store.totalQuestions}`;
  }

  return (
    <div className="px-4 pt-2 sm:px-6 sm:pt-3 flex flex-col">

      {/* Number and Read Aloud */}
      {/* 
      If has parent then display like
      */}
      <div className="flex items-center justify-between">
        <div className="text-secondary text-sm font-medium">
          {/* Question {QNumberUtil.getQNumber(props.vm.base.dOrder)} of {props.vm.base.store.totalQuestions} */}
          {qNumberText}
        </div>
        <SpeakButton vm={props.vm} />
      </div>


      {/* Type, Marks */}
      <div className="flex items-center space-x-2 w-full max-w-full mb-2">
        <QuestionTypeBadge type={props.vm.base.type.getName(props.vm.base.store.parentStore.formType)} />
        {props.vm.base.marks && <MarksBadge text={`${NumFmt.roundToStr(props.vm.base.marks)} Marks`} />}
      </div>

      {/* Question Text */}
      <QuestionText
        asterisk={props.vm.base.isRequired.isTrue}
        question={props.vm.base.question}
      />

      <QuestionErrorMessage vm={props.vm} />


      {/* Hint */}
      {props.vm.base.ansHint && (<HintTextView className="mt-2" hint={props.vm.base.ansHint} />)}
    </div>
  );
};

