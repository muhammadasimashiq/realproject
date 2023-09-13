import PropTypes from "prop-types";
import React from "react";
import StackComp from "../Stack/Stack";
import BoxComp from "../Box/Box";

const defaultRows = [
  {
    primary: <div>primary</div>,
    secondary: <div>secondary</div>,
  },
  {
    primary: <div>primary</div>,
    secondary: <div>secondary</div>,
  },
  {
    primary: <div>primary</div>,
    secondary: <div>secondary</div>,
  },
];

const FlexArrangement = ({ rows }) => {
  return (
    <StackComp>
      {rows.map((row, index) => (
        <StackComp
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          key={index}
        >
          <BoxComp>{row.primary}</BoxComp>
          <BoxComp>{row.secondary}</BoxComp>
        </StackComp>
      ))}
    </StackComp>
  );
};

FlexArrangement.propTypes = {
  rows: PropTypes.any,
};
FlexArrangement.defaultProps = {
  rows: defaultRows,
};
export default FlexArrangement;
