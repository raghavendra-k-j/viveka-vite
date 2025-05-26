import { UpsertQuestionStore } from "../UpsertQuestionStore";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { FValue } from "~/ui/widgets/form/FValue";
import { action, makeObservable, observable } from "mobx";
import { RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { createRef } from "react";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { InstanceId } from "~/core/utils/InstanceId";

export type UpsertQuestionVmProps = {
  id: number | null;
  storeRef: UpsertQuestionStore;
  type: FValue<QuestionType | null>;
  questionNode: ProseMirrorNode | null;
}

export class UpsertQuestionVm {

  readonly instanceId = InstanceId.generate("UpsertQuestionVm");
  readonly id: number | null;
  readonly storeRef: UpsertQuestionStore;
  readonly type: FValue<QuestionType | null>;
  questionTextRef: React.RefObject<RichPmEditorRef | null>;
  questionNode: ProseMirrorNode | null = null;

  constructor(props: UpsertQuestionVmProps) {
    this.id = props.id;
    this.storeRef = props.storeRef;
    this.type = props.type;
    this.questionTextRef = createRef<RichPmEditorRef>();
    this.questionNode = props.questionNode;
    makeObservable(this, {
      questionTextRef: observable.ref,
      onQuestionNodeChange: action,
      questionNode: observable.ref,
    });
  }

  onQuestionNodeChange(node: ProseMirrorNode | null): void {
    this.questionNode = node;
  }

}