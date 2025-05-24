import { useRef } from "react";
import { QuestionType } from "~/domain/forms/models/question/QuestionType";
import { STT } from "~/infra/utils/stt/STT";
import { blockSchema } from "~/ui/components/richpmeditor/pm/schema";
import { RichPmEditor } from "~/ui/components/richpmeditor/RichPmEditor";
import { HtmlToPm } from "~/ui/components/richpmeditor/utils/HtmlToPm";
import { PmToHtml } from "~/ui/components/richpmeditor/utils/PmToHtml";
import { FValue } from "~/ui/widgets/form/FValue";
import { FListBoxField } from "~/ui/widgets/form/input/FListBoxField";
import { Node as ProseMirrorNode } from 'prosemirror-model';
import FilledButton from "~/ui/widgets/button/FilledButton";

const HomePage: React.FC = () => {
  const questionType = useRef<FValue<QuestionType | null>>(new FValue<QuestionType | null>(null));
  const stt = useRef<STT>(new STT());
  const editorRef = useRef<{
    getContent: () => ProseMirrorNode | null;
    setContent: (doc: ProseMirrorNode) => void;
  }>(null);

  return (
    <div className="p-4 flex flex-col bg-surface gap-4 overflow-y-auto h-full">
      <FListBoxField<QuestionType>
        label="Question Type"
        className="w-64"
        inputSize="sm"
        required
        field={questionType.current}
        items={QuestionType.values}
        itemRenderer={(item) => item.name}
        itemKey={(item) => item.type}
        placeholder="Select question type"
      />


      <RichPmEditor
        ref={editorRef}
        schema={blockSchema}
        stt={stt.current}
        onChange={(value) => {
          const markdownContent = PmToHtml.getContent(value, blockSchema);
          const reverse = HtmlToPm.parse(markdownContent, blockSchema);
        }}
      />

      <FilledButton onClick={() => {
        const content = editorRef.current?.getContent();
        console.log("Content:", content ? PmToHtml.getContent(content, blockSchema) : "No content");
      }}>
        Get Content
      </FilledButton>

      <FilledButton onClick={() => {
        const content = "A sample content to set in the editor";
        if (content) {
          editorRef.current?.setContent(HtmlToPm.parse(content, blockSchema));
          console.log("Content set successfully");
        } else {
          console.error("No content to set");
        }
      }}>
        Set Content
      </FilledButton>

    </div>
  );
};

export default HomePage;
