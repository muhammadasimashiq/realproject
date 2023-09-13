import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/reducers/auth";
import constants from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UI from "../UI/UI";
import baseUrl from "../../../config/baseUrl";

const validationSchema = yup.object({
  email: yup.string("Enter your username").required("Username required!"),
  password: yup.string("Enter your password").required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrogMessage] = useState("");
  const [manageError, setManageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // dispatch(authActions.toggleLogInHandler("true"));
      // navigate("/", { replace: true });
      login(values);
    },
  });
  const login = async (values) => {
    setLoading(true);
    let URL = `${baseUrl}/system-user/login`;
    let token = await localStorage.getItem("auth-token");
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error === false) {
          setManageError(result.error);
          localStorage.setItem("auth-token", result.token);
          localStorage.setItem("mode", "light");
          dispatch(authActions.toggleLogInHandler("true"));
          navigate("/", { replace: true });
          setLoading(false);
        } else {
          setManageError(result.error);
          setErrogMessage(result.response);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const fields = [
    {
      id: "email",
      props: {
        name: "email",
        label: "Username",
        type: "text",
        fullWidth: true,
        value: formik.values.email,
        error: formik.touched.email && Boolean(formik.errors.email),
        helperText: formik.touched.email && formik.errors.email,
        onChange: (e) => {
          formik.handleChange(e);
        },
      },
    },
    {
      id: "password",
      props: {
        name: "password",
        label: "Password",
        type: "password",
        fullWidth: true,
        value: formik.values.password,
        error: formik.touched.password && Boolean(formik.errors.password),
        helperText: formik.touched.password && formik.errors.password,
        onChange: (e) => {
          formik.handleChange(e);
        },
      },
    },
  ];

  // const alternate = (
  //   <>
  //     <p>
  //       Dont have an ID? Click <Link to="/signup">here</Link> to sign up!
  //     </p>
  //   </>
  // );
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <UI
          fields={fields}
          title={constants.log_in}
          actionLabel={constants.log_in}
          // alternate={alternate}
          errorMessage={errorMessage}
          manageError={manageError}
          loading={loading}
        />
      </form>
    </>
  );
};

export default Login;
