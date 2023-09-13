import React from "react";
import TextField from "@mui/material/TextField";

const TextFieldComp = ({ label, ...props }) => {
  return <TextField label={label} {...props} />;
};

export default TextFieldComp;

TextFieldComp.defaultProps = {
  label: "No label given",
};
