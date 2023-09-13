import React from "react";
import { useQuill } from "react-quilljs";
import MathQuill from "./MathQuill";
import "quill/dist/quill.snow.css";
import ToggleButton from "@mui/material/ToggleButton";
import { CgMathPercent } from "react-icons/cg";
import Modal from "./../Modal/Modal";
const config = {
  initial: "",
  modules: {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    magicUrl: true,
  },
};

const Editor = (props) => {
  const { quill, quillRef, Quill } = useQuill({ modules: config.modules });

  if (Quill && !quill) {
    // For execute this line only once.
    const MagicUrl = require("quill-magic-url").default; // Install with 'yarn add quill-magic-url'
    Quill.register("modules/magicUrl", MagicUrl);
  }

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(config.initial);
      //   quill.on("text-change", (delta, oldDelta, source) => {
      //     console.group("Text change!");
      //     console.log("text only", quill.getText()); // Get text only
      //     console.log("delta", quill.getContents()); // Get delta contents
      //     console.log("innerHTML", quill.root.innerHTML); // Get innerHTML using quill
      //     console.log(
      //       "innerHTML using quilRef",
      //       quillRef.current.firstChild.innerHTML
      //     ); // Get innerHTML using quillRef
      //     console.groupEnd();
      //   });
    }
  }, [quill]);

  const [showEquation, setShowEquation] = React.useState(false);
  let latexString = "\\int_{a}^{b} f(x)dx = F(b) - F(a)";
  const addEquationHandler = (e) => {
    e.preventDefault();
    setShowEquation((prevState) => !prevState);
  };

  const getEquationHandler = (e) => {
    setShowEquation(false);

    const range = quill.getSelection(true);
    quill.deleteText(range.index, range.length);
    // quill.insertEmbed(range.index, "", e);
    quill.insertText(range.index + range.length + 1, e);
    quill.setSelection(range.index + range.length + 1);
  };

  const handleCloseModal = () => {
    setShowEquation(false);
  };
  return (
    <React.Fragment>
      <div style={{ width: "100%", maxHeight: 300, position: "relative" }}>
        <ToggleButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={addEquationHandler}
        >
          <CgMathPercent />
        </ToggleButton>
        <div ref={quillRef} />
      </div>
      <Modal open={showEquation} handleClose={handleCloseModal}>
        <MathQuill getValues={getEquationHandler} />
      </Modal>
    </React.Fragment>
  );
};

export default Editor;
