import React from "react";

const HeaderStyleDropdown = ({ onToggle, active, headerOptions }) => {
  return (
    <select value={active} onChange={(e) => onToggle(e.target.value)}>
      <option value="">Header Levels</option>
      {headerOptions.map((heading, index) => {
        const { style, label } = heading;
        return (
          <option key={index} value={style}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default HeaderStyleDropdown;
