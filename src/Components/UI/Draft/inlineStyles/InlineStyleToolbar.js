import React from "react";
import constants from "../constants";

export const INLINE_TYPES = [
  {
    label: "B",
    style: constants.bold,
  },
  {
    label: "I",
    style: constants.italic,
  },
  {
    label: "U",
    style: constants.underline,
  },
];

export const COLOR_PICKER = [
  {
    label: "yellow",
  },
  {
    label: "red",
  },
  {
    label: "green",
  },
];
const InlineStyleToolbar = ({ onToggle }) => {
  return (
    <div style={{ borderBottom: "1px solid grey" }}>
      {INLINE_TYPES.map((type, index) => {
        const { style, label } = type;
        return (
          <button
            key={index}
            onMouseDown={(e) => {
              e.preventDefault();
              onToggle(style);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default InlineStyleToolbar;
