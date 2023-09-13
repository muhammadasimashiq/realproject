import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/reducers/auth";
import constants from "../../../config/constants";
import { useNavigate, Link } from "react-router-dom";
import UI from "../UI/UI";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
  pass: yup
    .string("Enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("pass"), null], "Passwords must match")
    .required("Please Confirm Password"),
  email: yup.string().email("Invalid email format").required("Required"),
  fName: yup
    .string()
    .required("This field is Required!")
    .matches(/^[aA-zZ\s]+$/, "Invalid input for first name!"),
  lName: yup.string().matches(/^[aA-zZ\s]+$/, "Invalid input for last name!"),
});
const initialValues = {
  fName: "",
  lName: "",
  pass: "",
  email: "",
  confirmPass: "",
  terms: false,
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(authActions.toggleLogInHandler("true"));
      navigate("/", { replace: true });
    },
  });
  const [errors, setErrors] = React.useState(false);
  const [values, setValues] = React.useState({
    username: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    confirmPassword: {
      value: "",
      error: false,
    },
    contact: {
      value: "",
      error: false,
    },
  });

  const fields = [
    {
      id: "fName",
      props: {
        onChange: (e) => formik.handleChange(e),
        name: "fName",
        fullWidth: true,
        label: "First Name",
        value: formik.values.fName,
        error: formik.touched.fName && Boolean(formik.errors.fName),
        helperText: formik.touched.fName && formik.errors.fName,
      },
    },
    {
      id: "lName",
      props: {
        onChange: (e) => formik.handleChange(e),
        name: "lName",
        fullWidth: true,
        label: "Last Name",
        value: formik.values.lName,
        error: formik.touched.lName && Boolean(formik.errors.lName),
        helperText: formik.touched.lName && formik.errors.lName,
      },
    },
    {
      id: "email",
      props: {
        onChange: (e) => formik.handleChange(e),
        fullWidth: true,
        name: "email",
        label: "E-mail",
        value: formik.values.email,
        error: formik.touched.email && Boolean(formik.errors.email),
        helperText: formik.touched.email && formik.errors.email,
      },
    },
    {
      id: "pass",
      props: {
        onChange: (e) => formik.handleChange(e),
        fullWidth: true,
        name: "pass",
        type: "password",
        label: "Password",
        value: formik.values.pass,
        error: formik.touched.pass && Boolean(formik.errors.pass),
        helperText: formik.touched.pass && formik.errors.pass,
      },
    },
    {
      id: "confirmPass",
      props: {
        onChange: (e) => formik.handleChange(e),
        fullWidth: true,
        name: "confirmPass",
        label: "Confirm Password",
        type: "password",
        value: formik.values.confirmPass,
        error: formik.touched.confirmPass && Boolean(formik.errors.confirmPass),
        helperText: formik.touched.confirmPass && formik.errors.confirmPass,
      },
    },
  ];

  const alternate = (
    <p>
      Already have an ID? Click <Link to="/login">here</Link> to login!
    </p>
  );
  return (
    <form onSubmit={formik.handleSubmit}>
      <UI
        fields={fields}
        title={constants.sign_up}
        actionLabel={constants.sign_up}
        alternate={alternate}
      />
    </form>
  );
};

export default Login;
