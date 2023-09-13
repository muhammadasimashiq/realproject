import React from "react";
import PaperComp from "@mui/material/Paper";

const Paper = ({ children, ...props }) => {
  return <PaperComp {...props}>{children}</PaperComp>;
};

export default Paper;
