import React, { useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme
// import "quill/dist/quill.bubble.css"; // Add css for bubble theme

type TextEditor2Props = {
  placeholder?: string;
  className?: string;
  initialValue?: string;
  onEditorChange?: (value: string) => void;
};

export function TextEditor2({
  className = "",
  placeholder = "",
  initialValue = "",
  onEditorChange = () => {},
}: TextEditor2Props) {
  const { quill, quillRef } = useQuill({ placeholder: placeholder });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(initialValue);

      quill.on(
        "text-change",
        (_delta: any, _oldDelta: any, _source: string) => {
          onEditorChange(quill.root.innerHTML);

          // console.log(quill.getText()); // Get text only
          // console.log(quill.getContents()); // Get delta contents
          // console.log(quill.root.innerHTML); // Get innerHTML using quill
          // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        }
      );
    }
  }, [quill]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "300px",
        height: "300px",
        marginBottom: "60px",
      }}
      className={className}
    >
      <div ref={quillRef} />
    </div>
  );
}
