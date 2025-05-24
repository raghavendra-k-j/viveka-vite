import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { FValue } from "~/ui/widgets/form/FValue";
import { makeObservable } from "mobx";
import { RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { createRef } from "react";
import { EnAVm } from "./EnAVm";
import { Bool3 } from "~/core/utils/Bool3";
import { QuestionLevel } from "~/domain/forms/models/question/QuestionLevel";


export type UpsertQuestionVmProps = {
  id?: number;
  storeRef: UpsertQuestionStore;
  type: FValue<QuestionType | null>;
  enaVm: EnAVm | null;
  scorable: FValue<Bool3>;
  level: FValue<QuestionLevel | null>;
  marks: FValue<string>;
  isRequired: FValue<Bool3>;
}


export class UpsertQuestionVm {
  readonly id?: number;
  readonly storeRef: UpsertQuestionStore;
  readonly type: FValue<QuestionType | null>;
  questionTextRef: React.RefObject<RichPmEditorRef | null>;
  enaVm: EnAVm | null;
  scorable: FValue<Bool3>;
  level: FValue<QuestionLevel | null>;
  marks: FValue<string>;
  ansHintRef: React.RefObject<RichPmEditorRef | null>;
  ansExplanationRef: React.RefObject<RichPmEditorRef | null>;
  isRequired: FValue<Bool3>;

  constructor(props: UpsertQuestionVmProps) {
    this.id = props.id;
    this.storeRef = props.storeRef;
    this.type = props.type;
    this.questionTextRef = createRef<RichPmEditorRef>();
    this.enaVm = props.enaVm || null;
    this.scorable = props.scorable;
    this.level = props.level;
    this.marks = props.marks;
    this.ansHintRef = createRef<RichPmEditorRef>();
    this.ansExplanationRef = createRef<RichPmEditorRef>();
    this.isRequired = props.isRequired;
    makeObservable(this, {

    });
  }

  onChangeScorable(v: boolean): void {
    this.scorable.set(Bool3.fromBool(v));
  }

  onChangeLevel(v: QuestionLevel | null): void {
    this.level.set(v);
  }

  onRequiredChange(v: boolean): void {
    this.isRequired.set(Bool3.fromBool(v));
  }



}