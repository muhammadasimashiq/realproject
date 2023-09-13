import React from "react";
import Stack from "@mui/material/Stack";

const StackComp = ({ children, gap, ...props }) => {
  return (
    <Stack gap={gap} {...props}>
      {children}
    </Stack>
  );
};

export default StackComp;
StackComp.defaultProps = {
  gap: 3,
};
