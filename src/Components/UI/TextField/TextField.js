import React from "react";
import TextField from "@mui/material/TextField";
import { PropTypes } from "prop-types";

const MuiTextField = ({ label , fullwidth, variant, placeholder, getValue ,userName,  ...props }) => {
  
  const [name, setName ] = React.useState('')

  const textFieldHandler = (e) => {
    setName(e.target.value)
    // getValue()

  }
  return (
    <div>
      <TextField
        id="outlined-basic"
        label={label}
        value={name}
        variant={variant}
        placeholder={placeholder}
        fullWidth = {fullwidth}
        onChange = {textFieldHandler}
      />
    </div>
  );
};

export default MuiTextField;

MuiTextField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  fullwidth: PropTypes.bool,
  placeholder: PropTypes.string,
  userName: PropTypes.string,
  getValue: PropTypes.func,
};

MuiTextField.defaultProps = {
  label: "TextField",
  variant: "outlined", // filled,  standard, outlined
  fullwidth: true,
  placeholder: "",
  userName : 'ishtiaq',
  // getValue : (e) => console.log(e, 'no props given')

};
