import type { QuestionVm } from "../models/QuestionVm";
import { SpeakButton } from "./SpeakButton";
import { MarksBadge, QuestionTypeBadge } from "~/ui/components/question/QuestionBadges";
import { NumFmt } from "~/core/utils/NumFmt";
import { QNumberUtil } from "~/domain/forms/utils/QNumberUtil";
import { FillBlankToHtmlConverter } from "~/ui/utils/forms/FillBlankToHtmlConverter";

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
      <div className="text-default text-sm font-medium mt-2">
        {props.vm.base.isRequired.isTrue && <span className="text-red-500">*&nbsp;</span>}
        <span>Q{QNumberUtil.getQNumber(props.vm.base.dOrder)}. </span>
        <span
          dangerouslySetInnerHTML={{ __html: FillBlankToHtmlConverter.convert(props.vm.base.question) }}
        />
      </div>
    </div>
  );
};

