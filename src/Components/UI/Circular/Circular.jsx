import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import StackComp from "../Layout/Stack/Stack";

const Circular = ({ justify, ...props }) => {
  return (
    <StackComp direction="row" justifyContent={justify}>
      <CircularProgress {...props} />
    </StackComp>
  );
};

export default Circular;

Circular.defaultProps = {
  justify: "center",
};
