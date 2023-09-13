import React, { useEffect, useState } from "react";
import Accordion from "./../../../Components/UI/Accordion/Accordion";
import api from "./../../../services";
import ConfigureNotes from "./ConfigureNotes";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";

const AddNotesAccordion = ({ selected, previousCourseId }) => {
  const [controller, setController] = useState([]);
  const [tagIdState, setTagIdState] = useState();

  const getAlltagsHandler = async () => {
    let temp = await api.get.allTags();
    console.log(temp);
    let tempData = [...temp.data];
    let tempp = tempData.map((item) => ({
      name: item.title,
      panelHeading: item.title,
      id: item.id,
      content: <ConfigureNotes selected={selected} tag={item} />,
    }));
    setController(tempp);
  };
  useEffect(() => {
    getAlltagsHandler();
  }, [selected]);

  return (
    <div>
      <ErrorBoundary>
        <Accordion
          accordion_controls={controller}
          setTagIdState={setTagIdState}
        />
      </ErrorBoundary>
    </div>
  );
};
export default AddNotesAccordion;
