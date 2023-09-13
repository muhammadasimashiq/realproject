import React from "react";
import Box from "@mui/material/Box";

const BoxComp = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default BoxComp;
