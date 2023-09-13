import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBtn = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  // width: width ? width : theme.spacing(14),
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const ButtonComp = ({ clickHandler, variant, children, size, ...props }) => {
  return (
    <StyledBtn size={size} variant={variant} {...props}>
      {children}
    </StyledBtn>
  );
};

export default ButtonComp;

ButtonComp.defaultProps = {
  size: "small",
  variant: "contained",
};
