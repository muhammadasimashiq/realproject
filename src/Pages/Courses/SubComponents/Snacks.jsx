import React from "react";
import Table from "../../../Components/UI/Table/Table";
import UI from "../UI/CourseStructure";
import Accordion from "../../../Components/UI/Accordion/Accordion";

const Snacks = () => {
  const accordionController = [
    {
      name: "Moles",
      content: <Table />,
      panelHeading: "Chapter 1",
      panelDescription: "Moles",
    },
    {
      name: "inorganic",
      content: <Table />,
      panelHeading: "Chapter 2",
      panelDescription: "Inorganic Chemistry",
    },
  ];
  return (
    <UI title="Snacks">
      <Accordion accordion_controls={accordionController} />
    </UI>
  );
};

export default Snacks;
