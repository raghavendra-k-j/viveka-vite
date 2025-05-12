import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import katex from 'katex';


type UserAnswerEditorProps = {
  onAnswerChanged: (answers: string) => void;
  initialValue?: string;
}

const UserAnswerEditor: React.FC<UserAnswerEditorProps> = ({ onAnswerChanged, initialValue }) => {
  const [isClient, setIsClient] = useState(false);
  const editorRef = React.useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      onAnswerChanged(content);
    }
  };

  if (!isClient) return <div className='h-[200px]'>.</div>;

  const insertMathMLEquation = (editor: any, equation: string) => {
    const mathHtml = katex.renderToString(equation, {
      throwOnError: true,
      output: 'html'
    });

    const element = document.createElement('span');
    element.innerHTML = mathHtml;
    element.setAttribute('contenteditable', 'false');
    element.setAttribute('data-mathml', equation);
    const contentToInsert = element.outerHTML;
    editor.insertContent(contentToInsert, { format: 'html' });
  };

  const openMathMLDialog = (editor: any) => {
    const userInput = ("x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");
    if (userInput) {
      insertMathMLEquation(editor, userInput);
    }
  };

  return (
    <div>
      <Editor
        tinymceScriptSrc="/packages/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
        initialValue={initialValue || ''}
        init={{
          height: 200,
          statusbar: false,
          menubar: false,
          plugins: ['lists', 'code'],
          valid_elements: '*[*]',
          content_css: [
            '/packages/katex/katex.min.css',
          ],
          toolbar: 'bold italic underline | bullist numlist | equation | code',
          setup: (editor: any) => {
            editor.ui.registry.addButton('equation', {
              text: 'Equation',
              onAction: () => openMathMLDialog(editor),
            });
          },
        }}
      />
    </div>
  );
};

export default UserAnswerEditor;
