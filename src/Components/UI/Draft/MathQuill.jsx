import React, { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import Button from "./../Button/Button";

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles();

const EditableMathExample = ({ getValues }) => {
  const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        minHeight: "inherit",
      }}
    >
      <div>
        <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex());
          }}
        />
      </div>
      <Button
        width="10rem"
        onClick={(e) => {
          e.preventDefault();
          getValues(latex);
          setLatex("");
        }}
      >
        Add Equation
      </Button>
    </div>
  );
};

export default EditableMathExample;

EditableMathExample.defaultProps = {
  getValues: (e) => console.log(e, "no props given"),
};
