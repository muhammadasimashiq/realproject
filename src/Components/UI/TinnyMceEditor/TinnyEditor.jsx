import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useHtmlReturn from "../TextEditor/QuillEditor/hooks/useHtmlReturn";
import { IoIosSend } from "react-icons/io";
import "./index.css";
import { tinnyMceConst } from "../../../config/constants";

export default function TinnyEditor({
  getContent,
  maxWidth,
  width,
  defaultContent,
  includeSendBtn,
  edit,
  getLengthOfContent,
  style,
}) {
  const { handleGetReturn } = useHtmlReturn();
  const editorRef = useRef(null);
  const onClick = () => {
    const temp = handleGetReturn(editorRef.current.getContent());
    if (temp.size > 0) {
      getContent(temp);
      editorRef.current.setContent("");
    }
  };

  const imagePicker = (cb, value, meta) => {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = function () {
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        var id = "blobid" + new Date().getTime();
        var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(",")[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };
  const handleImagesReorder = (editor, images) => {
    images.forEach((image, index) => {
      // Update the image position within the editor
      editor.dom.setAttrib(image.id, "data-mce-top", index * 100);
    });
  };
  const onEditChange = (value) => {
    getLengthOfContent(value.size);
    if (edit) {
      getContent(handleGetReturn(editorRef.current.getContent()));
    }
  };
  return (
    <div className="container">
      <div style={{ width, maxWidth, height: "100%" }}>
        <Editor
          apiKey={tinnyMceConst.tinnyMceApiKey}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={defaultContent}
          onEditorChange={(value) => !includeSendBtn && onEditChange(value)}
          init={{
            width: "100%",
            height: "100%",
            menubar: true,
            images_file_types: tinnyMceConst.imgType,
            block_unsupported_drop: false,
            file_picker_types: tinnyMceConst.filePikerType,

            automatic_uploads: false,
            plugins: tinnyMceConst.plugins,
            toolbar: tinnyMceConst.toolBar,
            content_style: tinnyMceConst.contentDefaultStyle,
            file_picker_callback: imagePicker,
            images_dataimg_filter: function (img) {
              return !img.hasAttribute("internal-blob");
            },
          }}
        />
        {edit ? (
          ""
        ) : (
          <button
            // disabled={includeSendBtn}
            ref={editorRef}
            // style={style}
            className={
              edit ? "edit-quill-send-btn btnStyle" : "quill-send-btn btnStyle"
            }
            onClick={onClick}
          >
            <IoIosSend color={"rgb(224,21,162)"} />
          </button>
        )}
      </div>
    </div>
  );
}

TinnyEditor.defaultProps = {
  width: "100%",
  maxWidth: "100%",
  getContent: (e) => {
    return;
  },
  includeSendBtn: true,
  isContentEmpty: (e) => {
    return;
  },
  getLengthOfContent: (e) => {
    return;
  },
  getSnapshot: (e) => {
    return;
  },
};
