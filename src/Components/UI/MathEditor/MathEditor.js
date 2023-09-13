import React from "react";
import { Tex } from "react-tex";

const MathEditor = ({ latexString }) => {
  return <Tex texContent={latexString} />;
};

export default MathEditor;

MathEditor.defaultProps = {
  latexString: "",
};
