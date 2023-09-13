import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDesignTokens } from "../config/theme";

const Theme = ({ children, mode }) => {
  const theme = createTheme(getDesignTokens(mode));
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
