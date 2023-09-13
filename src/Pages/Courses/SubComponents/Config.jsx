import React from "react";
import Tabs from "../../../Components/UI/Tabs/Tabs";
import Units from "./Units";
import Chapters from "./Chapters";
import Snacks from "./Snacks";

const Config = () => {
  const tabs = [
    {
      value: 0,
      label: "Units",
      content: <Units />,
    },
    {
      value: 1,
      label: "Chapters",
      content: <Chapters />,
    },
    {
      value: 2,
      label: "Snacks",
      content: <Snacks />,
    },
  ];
  return (
    <div>
      <Tabs orientation="vertical" tabs={tabs} />
    </div>
  );
};

export default Config;
