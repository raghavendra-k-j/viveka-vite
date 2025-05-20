import type { QuestionVm } from "../models/QuestionVm";
import { SpeakButton } from "./SpeakButton";
import { MarksBadge, QuestionTypeBadge } from "~/ui/components/question/QuestionBadges";
import { NumFmt } from "~/core/utils/NumFmt";
import { QNumberUtil } from "~/domain/forms/utils/QNumberUtil";
import { QuestionText } from "~/ui/components/form/commons/QuestionText";
import { HintTextView } from "~/ui/components/form/commons/HintText";

type QuestionHeaderProps = {
  vm: QuestionVm;
}

export const QuestionHeaderView = (props: QuestionHeaderProps) => {
  return (
    <div className="px-4 pt-2 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 w-full max-w-full">
          <QuestionTypeBadge type={props.vm.base.type.getName(props.vm.base.store.parentStore.formType)} />
          {props.vm.base.marks && <MarksBadge text={`${NumFmt.roundToStr(props.vm.base.marks)} Marks`} />}
        </div>
        <SpeakButton vm={props.vm} />
      </div>
      <QuestionText
        asterisk={props.vm.base.isRequired.isTrue}
        number={`${QNumberUtil.getQNumber(props.vm.base.dOrder, )}`}
        question={props.vm.base.question}
      />
      {props.vm.base.ansHint && (<HintTextView className="mt-2" hint={props.vm.base.ansHint}/>)}
    </div>
  );
};

