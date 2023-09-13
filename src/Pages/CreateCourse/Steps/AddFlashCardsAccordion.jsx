import React, { useState, useEffect } from "react";
import Accordion from "./../../../Components/UI/Accordion/Accordion";
import api from "./../../../services";
import ConfigureFlashcards from "./ConfigureFlashcards";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";

const AddFlashCardsAccordion = ({ selected }) => {
  const [flashCardController, setFlashCardController] = useState([]);

  const getAllFlashCardHandler = async () => {
    let temp = await api.get.allTags();
    let tempData = [...temp.data];
    let tempp = tempData.map((item) => ({
      name: item.title,
      panelHeading: item.title,
      id: item.id,
      content: <ConfigureFlashcards selected={selected} tag={item} />,
    }));
    console.log("tempp", tempp);
    setFlashCardController(tempp);
  };

  useEffect(() => {
    getAllFlashCardHandler();
  }, [selected]);

  return (
    <ErrorBoundary>
      <Accordion accordion_controls={flashCardController} />
    </ErrorBoundary>
  );
};

export default AddFlashCardsAccordion;
