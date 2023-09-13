import React from "react";
import { StyledTypography } from "./Typography.style";

const Typography = ({ children, ...props }) => {
  return <StyledTypography {...props}>{children}</StyledTypography>;
};

export default Typography;
