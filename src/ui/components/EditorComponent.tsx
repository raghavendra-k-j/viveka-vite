import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import katex from 'katex';


const EditorComponent: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>Loading editor...</div>;

  const insertMathMLEquation = (editor: any, equation: string) => {
    const mathHtml = katex.renderToString(equation, {
      throwOnError: false,
      output: 'html'
    });
    const contentToInsert = `<span contenteditable="false">${mathHtml}</span>`;
    editor.insertContent(contentToInsert, { format: 'html' });

  };

  const openMathMLDialog = (editor: any) => {
    insertMathMLEquation(editor, "e=mc^2");
  };

  return (
    <>
      <div className='w-[100%] h-[200px]'>
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          init={{
            height: 500,
            statusbar: false,
            menubar: false,
            plugins: ['lists'],
            toolbar_mode: 'wrap',
            extended_valid_elements: 'span[class|style|aria-hidden|contenteditable],span[class=katex-display]/span[class=katex]/span[class=katex-html]/span',
            content_css: [
              'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
              'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
            ],
            toolbar: 'bold italic underline | bullist numlist | equation',
            setup: (editor: any) => {
              editor.ui.registry.addButton('equation', {
                text: 'Equation',
                onAction: () => openMathMLDialog(editor),
              });
            },
          }}
        />
      </div>
    </>
  );
};

export default EditorComponent;
