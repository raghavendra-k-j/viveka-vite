import type { QuestionVm } from "../models/QuestionVm";
import { SpeakButton } from "./SpeakButton";
import { LevelBadge, MarksBadge, QuestionTypeBadge } from "~/ui/components/question/QuestionBadges";
import { NumFmt } from "~/core/utils/NumFmt";

type QuestionHeaderProps = {
  vm: QuestionVm;
}

export const QuestionHeaderView = (props: QuestionHeaderProps) => {
  return (
    <div className="px-4 pt-2 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 w-full max-w-full">
          <QuestionTypeBadge type={props.vm.base.type.getName(props.vm.base.store.parentStore.formType)} />
          {props.vm.base.level && (
            <>
              <div className=" block md:hidden">
                <LevelBadge text={`${props.vm.base.level.name.charAt(0)}`} />
              </div>
              <div className="hidden md:block">
                <LevelBadge text={props.vm.base.level.name} />
              </div>
            </>
          )}
          {props.vm.base.marks && <MarksBadge text={`${NumFmt.roundToStr(props.vm.base.marks)} Marks`} />}
        </div>
        <SpeakButton vm={props.vm} />
      </div>
      <div className="text-default text-[15px] font-medium mt-2">
        {props.vm.base.isRequired.isTrue && <span className="text-error">*&nbsp;</span>}
        <span>Q{props.vm.base.dOrder}. </span>
        {props.vm.base.question}
      </div>
    </div>
  );
};

