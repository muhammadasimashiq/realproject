import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";


const Loader = ({ ...props }) => {
  const Wrapper = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Wrapper>
      <CircularProgress
        {...props}
        sx={{ color: "#E015A2"}}
      />
    </Wrapper>
  );
};
export default Loader;