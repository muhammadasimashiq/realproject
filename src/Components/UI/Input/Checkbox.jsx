import PropTypes from "prop-types";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ControlledCheckbox({
  checked,
  setChecked,
  labelProps,
  checkboxProps,
  label,
  hasLabel,
  direction,
}) {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        label={label}
        labelPlacement={direction}
        control={
          <Checkbox
            {...labelProps}
            {...checkboxProps}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
    </FormGroup>
  );
}

ControlledCheckbox.propTypes = {
  checkboxProps: PropTypes.any,
  checked: PropTypes.bool,
  direction: PropTypes.any,
  label: PropTypes.any,
  labelProps: PropTypes.any,
  setChecked: PropTypes.func,
};

ControlledCheckbox.defaultProps = {
  checked: true,
  setChecked: (e) => console.log(e, "state not set"),
  label: "no label",
  direction: "end",
  hasLabel: true,
};
