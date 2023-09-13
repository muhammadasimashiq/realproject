import React from "react";
import GridComp from "../../Components/UI/Layout/Grid/Grid";
import Tabs from "../../Components/UI/Tabs/Tabs";
import FlashCards from "./SubComponents/Flashcards";
import LearningObjectives from "./SubComponents/LearningObjectives";
import Notes from "./SubComponents/Notes";
import Config from "./SubComponents/Config";
import Select from "./../../Components/UI/SelectTextField/SelectTextField";
import { useLocation } from "react-router-dom";
import Typography from "../../Components/UI/Typography/Typography";
import StackComp from "../../Components/UI/Layout/Stack/Stack";
import api from "./../../services";
import Loader from "../../Components/UI/Loader/Loader";
import Alert from './../../Components/UI/Alert/Alert';

const controller = (props) => [
  {
    value: 0,
    label: "Notes",
    content: <Notes {...props} />,
  },
  {
    value: 1,
    label: "Flash Cards",
    content: <FlashCards {...props} />,
  },
  {
    value: 2,
    label: "Learning Objectives",
    content: <LearningObjectives {...props} />,
  },
  {
    value: 3,
    label: "Config",
    content: <Config {...props} />,
  },
];

const Subject = () => {
  const [content, setContent] = React.useState({});
  const { state } = useLocation();
  const [dataIsLoading, setDataIsLoading] = React.useState(false);
  const [levels, setLevels] = React.useState([]);
  const [levelIsSelected, setLevelIsSelected] = React.useState({});

  const getContent = async () => {
    let temp = await api.get.getSingleCourseDetails(state, levelIsSelected);
    setContent({ ...temp });
    setDataIsLoading(false);
  };

  const getLevel = async () => {
    let temp = await api.get.getLevel();
    setLevels([...temp.data.rows.map((el) => ({ ...el, name: el.title }))]);
  };

  const selectLevelHandler = (e) => {
    setLevelIsSelected({ ...e });
  };

  React.useEffect(() => {
    getLevel();
  }, []);

  React.useEffect(() => {
    setDataIsLoading(true);
    getContent();
  }, [levelIsSelected]);

  return (
    <GridComp item xs={12}>
      <StackComp>
        <Typography variant="h4">{state.name}</Typography>
        <Select
          fullWidth
          labelName={"Select Level"}
          defaultName="Select Level"
          data={levels}
          getLevel={selectLevelHandler}
        />
        {dataIsLoading ? (
          <Loader />
        ) : levelIsSelected.id &&
          levelIsSelected.name !== "" &&
          content.published ? (
          <Tabs
            tabs={controller({
              subject: state,
              level: levelIsSelected,
              subjectMatter: content,
            })}
          />
        ) : (
          <Alert message="Course not added yet! Please create a new course"/>
         
        )}
      </StackComp>
    </GridComp>
  );
};

export default Subject;
