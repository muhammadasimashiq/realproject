import * as React from "react";
// import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { PropTypes } from "prop-types";
import countries from "../../../config/mockData/countries.json";

// const country = [
//   {
//     name: "pakistan",
//   },
//   {
//     name: "india",
//   },
//   {
//     name: "america",
//   },
//   {
//     name: "china",
//   },
//   {
//     name: "russia",
//   },
 
// ];
 const formattedDefaultData = countries.map((country) => {
  return {
    value: country.value,
    label: country.label,
  };
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectTextField = ({
  labelName,
  data,
  defaultName,
  fullWidth,
  width,
  getLevel,
  defaultFieldValue,
}) => {
  const [userName, setUserName] = React.useState("");

  const handleChange = (event) => {
      const selected = data.find((row) => row.value === event.target.value);
    setUserName(event.target.value);
    getLevel(selected);
  };

  return (
    <div>
      <FormControl sx={{ width: fullWidth ? "100%" : width }}>
        <InputLabel id="demo-multiple-name-label">{labelName}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={userName?userName:defaultFieldValue}
          onChange={handleChange}
          input={<OutlinedInput label={labelName} />}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>{defaultName}</em>
          </MenuItem>
          {data.map((name, index) => (
            <MenuItem key={index} value={name.value}>
              {name.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectTextField;
SelectTextField.propTypes = {
  labelName: PropTypes.string,
  data: PropTypes.array,
  defaultName: PropTypes.string,
  defaultFieldValue: PropTypes.string,
};

SelectTextField.defaultProps = {
  labelName: "Country",
  defaultName: "Pakistan",
  defaultFieldValue: null,
  data: formattedDefaultData,
  fullWidth: false,
  width: "10rem",
  getLevel: (e) => console.log(e, "no props given"),
};
