import React from "react";
import Card from "@mui/material/Card";
import Typography from "../Typography/Typography";
import Stack from "../Layout/Stack/Stack";
import Box from "../Layout/Box/Box";

const CardComp = ({ title, children, stackProps, width, ...props }) => {
  return (
    <Card sx={{ p: 2, width: width }} {...props}>
      <Stack style={stackProps}>
        <Typography variant="h5">{title}</Typography>
        <Box>{children}</Box>
      </Stack>
    </Card>
  );
};

export default CardComp;

CardComp.defaultProps = {
  gap: 2,
  title: "No title given",
  children: <div>no children given</div>,
  width: "100%",
  stackProps: {},
};
