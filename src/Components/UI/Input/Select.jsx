import PropTypes from "prop-types";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ label, options, ...props }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          {...props}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
        >
          {options.map((option, index) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
};

const default_options = [
  {
    value: 10,
    label: "Ten",
  },
  {
    value: 20,
    label: "Twenty",
  },
  {
    value: 30,
    label: "Thirty",
  },
];

BasicSelect.defaultProps = {
  options: default_options,
  label: "No label given",
};
