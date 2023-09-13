import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import ButtonComp from "./../../Components/UI/Button/Button";
import Typography from "./../../Components/UI/Typography/Typography";
import TextFieldComp from "./../../Components/UI/Input/TextField";
import ErrorBoundary from "./../../Errors/ErrorBoundary";

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

const ConfigModel = ({ updateHandler, selectedCategory }) => {
  const [value, setValue] = React.useState("");
  const categoryTitle = selectedCategory.row.title;

  useEffect(()=>{

    setValue(categoryTitle)

  },[])
  return (
    <Main>
      <ErrorBoundary>
        <Typography>Edit Category: </Typography>
        <TextFieldComp
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label=""
          fullWidth
        />
        <ButtonWrapper>
          <Button onClick={() => updateHandler(value)}>Update</Button>
        </ButtonWrapper>
      </ErrorBoundary>
    </Main>
  );
};

export default ConfigModel;
