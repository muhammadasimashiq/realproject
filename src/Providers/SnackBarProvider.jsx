import React from "react";
import { SnackbarProvider } from "notistack";
import { styled } from "@mui/material/styles";

const StyledSnackBar = styled(SnackbarProvider)(({ theme }) => ({
  "&.SnackbarItem-variantSuccess": {
    backgroundColor: theme.palette.success.main,
  },
  "&.SnackbarItem-variantWarning": {
    backgroundColor: theme.palette.warning.main,
  },
  "&.SnackbarItem-variantInfo": {
    backgroundColor: theme.palette.info.main,
  },
  "&.SnackbarItem-variantError": {
    backgroundColor: theme.palette.error.main,
  },
}));

const SnackBarProvider = ({ children, ...props }) => {
  return (
    <StyledSnackBar
      autoHideDuration={1500}
      preventDuplicate={true}
      maxSnack={3}
      {...props}
    >
      {children}
    </StyledSnackBar>
  );
};

export default SnackBarProvider;
