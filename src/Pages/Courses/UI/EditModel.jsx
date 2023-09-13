import React from "react";
import { styled } from "@mui/material/styles";
import TextFieldComp from "./../../../Components/UI/Input/TextField";
import Typography from "./../../../Components/UI/Typography/Typography";
import ButtonComp from "./../../../Components/UI/Button/Button";

const Main = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));
const Button = styled(ButtonComp)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
const ButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const EditModel = () => {
  return (
    <Main>
      <Typography>Edit User Name: </Typography>
      <TextFieldComp label="Name" fullWidth />
      <ButtonWrapper>
        <Button>Update</Button>
      </ButtonWrapper>
    </Main>
  );
};

export default EditModel;
