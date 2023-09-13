import React from "react";
import Card from "../../../Components/UI/Card/Card";
import Stack from "../../../Components/UI/Layout/Stack/Stack";
import Button from "../../../Components/UI/Button/Button";
import TextFieldComp from "../../../Components/UI/Input/TextField";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import Alert from "./../../../Components/UI/Alert/Alert";
import { styled } from "@mui/material/styles";

const Login = ({
  title,
  fields,
  actionLabel,
  alternate,
  errorMessage,
  manageError,
  loading
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const Wrapper = styled("div")(({ theme }) => ({
    marginBottom: theme.spacing(3),
  }));
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Card width="40vw" style={{ maxWidth: "30rem" }} title={title}>
        {manageError ? (
          <Wrapper>
            <Alert severity="warning" message={errorMessage} title="warning" />
          </Wrapper>
        ) : null}

        <Stack>
          {fields.map((field, index) => (
            <TextFieldComp
              size={matches ? "small" : "medium"}
              {...field.props}
              key={index}
              name={field.id}
            />
          ))}
          <Button type="submit" sx={{ alignSelf: "center" }} disabled={loading?true:false}>
            {loading?"please Wait....":actionLabel}
          </Button>
          {alternate}
        </Stack>
      </Card>
    </Stack>
  );
};

export default Login;
