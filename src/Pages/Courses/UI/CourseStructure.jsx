import PropTypes from "prop-types";
import React from "react";
import Typography from "../../../Components/UI/Typography/Typography";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";

const UI = ({ title, children }) => {
  return (
    <StackComp>
      <Typography variant="h5">Configure {title}</Typography>
      {children}
    </StackComp>
  );
};

UI.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any.isRequired,
};

export default UI;
