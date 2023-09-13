import React, { useCallback, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./QuillEditor.css";
import { IoIosSend } from "react-icons/io";
import useHtmlReturn from "./hooks/useHtmlReturn";
import BlotFormatter from "quill-blot-formatter";
import {
  LIMIT_IN_BYTES,
  SIZE_OF_TEXT_EDITOR_INCREASED_ERROR,
} from "../../../../config/constants";

Quill.register("modules/blotFormatter", BlotFormatter);
window.katex = katex;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
  ["formula"],
];

const TextEditor = ({
  getContent,
  maxWidth,
  width,
  defaultContent,
  includeSendBtn,
  getLengthOfContent,
}) => {
  const [quill, setQuill] = useState();
  const [sizeIsExceeding, setSizeIsExceeding] = React.useState(false);
  const [data, setData] = React.useState("");
  const [returnedObj, setReturnedObj] = React.useState({});
  const { handleGetReturn } = useHtmlReturn();
  if (!includeSendBtn && quill) {
    const lengthOfContent = quill.getLength();
    getLengthOfContent(lengthOfContent);
  }

  React.useEffect(() => {
    if (quill) {
      const returnedFromHook = handleGetReturn(data, quill.getContents());
      // check if size is greater than limit, then return with error
      if (returnedFromHook.size > LIMIT_IN_BYTES) {
        setSizeIsExceeding(true);
      } else {
        setSizeIsExceeding(false);
      }

      setReturnedObj(returnedFromHook);
    }
  }, [data]);

  React.useEffect(() => {
    if (!includeSendBtn) {
      getContent(returnedObj);
    }
  }, [returnedObj]);

  const sendBtnRef = React.useRef(null);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      placeholder: "Enter some text",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        blotFormatter: {},
      },
    });
    if (Quill) {
      Quill.register("modules/blotFormatter", BlotFormatter);
    }
    q.setContents(defaultContent);
    const lengthOfContent = q.getLength();
    q.on("editor-change", (eventName, ...args) => {
      setData(wrapper.querySelector(".ql-editor").innerHTML);
      if (!includeSendBtn) {
        getLengthOfContent(lengthOfContent);
      }
    });

    setQuill(q);
  }, []);

  return (
    <div className="quill-wrapper" style={{ width, maxWidth }}>
      {includeSendBtn ? (
        <button
          disabled={sizeIsExceeding}
          ref={sendBtnRef}
          className="quill-send-btn"
          onClick={(e) => {
            e.preventDefault();
            getContent(returnedObj);
          }}
        >
          <IoIosSend color={sizeIsExceeding ? "grey" : "rgb(224,21,162)"} />
        </button>
      ) : null}
      <div className="quill-container" ref={wrapperRef}></div>
      {sizeIsExceeding ? (
        <p style={{ color: "red" }}>{SIZE_OF_TEXT_EDITOR_INCREASED_ERROR}</p>
      ) : null}
    </div>
  );
};

TextEditor.defaultProps = {
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

export default TextEditor;
