import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMceComp() {
  const editorRef = useRef(null);
  console.log(editorRef);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="q81rpi39ipebfk53jepgpalibte54alvzueskrgvbx9p51sh"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          selector: "textarea",
          height: 500,
          //   external_plugins: {
          //     tiny_mce_wiris: `@wiris/mathtype-tinymce5/plugin.min.js`,
          //   },
          menubar: true,
          plugins: [
            "formula",
            "equation-editor",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          //   formula: {
          //     path: "path/to/public/plugin/folder",
          //   },
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "equation-editor" +
            "formula" +
            "removeformat | help",
          content_style:
            "body { font-family:Avenier Next, Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
