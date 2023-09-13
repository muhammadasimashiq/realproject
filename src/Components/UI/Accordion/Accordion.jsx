import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const accordions_controller = [
  {
    name: "first",
    content: <div>First Accordion Content</div>,
    panelHeading: "First",
    panelDescription: "first",
    id: 1,
  },
  {
    name: "second",
    content: <div>First Accordion Content</div>,
    panelHeading: "Second",
    panelDescription: "second",
    id: 2,
  },
  {
    name: "third",
    content: <div>First Accordion Content</div>,
    panelHeading: "Third",
    panelDescription: "third",
    id: 3,
  },
];

export default function ControlledAccordions({
  accordion_controls,
  setTagIdState,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setTagIdState(panel.id);
    setExpanded(isExpanded ? panel.name : false);
  };
  // accordion_controls.sort((a, b) => {
  //   return a.id - b.id;
  // });
  // console.log("accordion_controls", accordion_controls);
  return (
    <React.Fragment>
      {accordion_controls.map((accordion, index) => (
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          key={index}
          expanded={expanded === accordion.name}
          onChange={handleChange(accordion)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: 500 }}>
              {accordion.panelHeading}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {accordion.panelDescription}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{accordion.content}</AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  );
}

ControlledAccordions.defaultProps = {
  accordion_controls: accordions_controller,
  setTagIdState: (e) => console.log(e, "no props given"),
};
