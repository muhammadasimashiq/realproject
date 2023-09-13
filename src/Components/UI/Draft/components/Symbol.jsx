import React from "react";
import MathEditor from "../../MathEditor/MathEditor";

const Equations = (props) => {
  return (
    <span>
      <MathEditor {...props} />
    </span>
  );
};

export default Equations;
