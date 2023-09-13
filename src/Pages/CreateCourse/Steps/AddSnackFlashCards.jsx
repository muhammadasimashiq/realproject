import React, { useState } from "react";
import BaseUI from "../BaseUI";
import { useDispatch, useSelector } from "react-redux";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import List from "../../../Components/UI/List/List";
import GridComp from "../../../Components/UI/Layout/Grid/Grid";
import Paper from "../../../Components/UI/Paper/Paper";
import Box from "../../../Components/UI/Layout/Box/Box";
import data from "../../../config/mockData/dummy_chapters.json";
import Typography from "../../../Components/UI/Typography/Typography";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";
import Tabs from "../../../Components/UI/Tabs/Tabs";
import AddNotesAccordion from "./AddNotesAccordion";
import AddFlashCardsAccordion from "./AddFlashCardsAccordion";
import api from "./../../../services";
import Alert from "./../../../Components/UI/Alert/Alert";
import baseUrl from "../../../config/baseUrl";
import { Loader } from "../../../helpers/Loader";
import { ADD_CONTENT_CONTEXT } from "../../../Context/AddContent";
const AddSnackFlashCards = () => {
  const [listItems, setListItems] = useState([]);
  const [chaps, setChaps] = React.useState([]);
  const [selected, setSelected] = useState({ name: "", label: "" });
  const [loading, setLoading] = useState(true);
  const previousIds = useSelector((state) => state.createCourse);
  const { currentCourdId: previousCourseId } = previousIds;

  const tabs = [
    {
      value: 0,
      label: "Notes",
      content: (
        <AddNotesAccordion
          selected={selected}
          currentCourdId={previousCourseId}
        />
      ),
    },
    {
      value: 1,
      label: "Flash Cards",
      content: (
        <AddFlashCardsAccordion
          selected={selected}
          currentCourdId={previousCourseId}
        />
      ),
    },
  ];

  let token = localStorage.getItem("auth-token");
  const getCourseUnitHierarchy = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let getChaptersURL = `${baseUrl}/course/extracttitles/${previousCourseId}`;
    await fetch(getChaptersURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        courseDetailControler(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  React.useEffect(() => {
    getCourseUnitHierarchy();
  }, []);
  const courseDetailControler = (data) => {
    const { units, chapters } = data;
    console.log(units);
    if (units) {
      const unitsData = units.map((el) => {
        return {
          type: "unit",
          layer: 1,
          name: el.title,
          label: el.title,
          id: el.id,
          childrenElements:
            el.chapters.length === 0
              ? null
              : [
                  ...el.chapters.map((chItem, index) => {
                    const chapterIds = chItem.id;
                    const chapterName = chItem.title;
                    return {
                      type: "chapter",
                      layer: 2,
                      name: chapterName,
                      chapId: chItem.id,
                      id: chapterIds,
                      label: `Chapter ${index + 1} ${chapterName}`,
                      childrenElements:
                        chItem.snacks.length === 0
                          ? null
                          : [
                              ...chItem.snacks.map((snackItem, snackIndex) => {
                                const snackName = snackItem.title;
                                const snackId = snackItem.id;
                                return {
                                  type: "snack",
                                  layer: 3,
                                  name: snackName,
                                  id: snackId,
                                  chapId: chItem.id,
                                  label: `${index + 1}.${
                                    snackIndex + 1
                                  }. ${snackName}`,
                                };
                              }),
                            ],
                    };
                  }),
                ],
        };
      });
      setListItems(unitsData);
    } else {
      const chapterData = chapters.map((el, index) => {
        return {
          type: "chapter",
          layer: 2,
          name: el.title,
          chapId: el.id,
          id: el.id,
          label: `Chapter ${index + 1} ${el.title}`,
          childrenElements:
            el.snacks.length === 0
              ? null
              : [
                  ...el.snacks.map((snackItem, snackIndex) => {
                    const snackName = snackItem.title;
                    const snackId = snackItem.id;
                    return {
                      type: "snack",
                      layer: 3,
                      chapId: el.id,
                      name: snackName,
                      id: snackId,
                      label: `${index + 1}.${snackIndex + 1}. ${snackName}`,
                    };
                  }),
                ],
        };
      });
      setListItems(chapterData);
    }
  };

  const itemClickHandler = (e) => {
    if (!e.nested) {
      setSelected(e);
    }
  };
  React.useEffect(() => {
    setChaps([...data]);
  }, []);

  const dispatch = useDispatch();

  const publishButtonHandler = async () => {
    let published = await api.put.publishedApiHadler(previousCourseId);
    if (published.error === false) {
      dispatch(createCourseStepperActions.setPage(7));
    } else {
      console.log("publish api not working");
    }
  };
  return (
    <BaseUI
      title="Add Content"
      forwardBtnText="Finish"
      forwardBtnProps={{
        onClick: (e) => publishButtonHandler(e),
      }}
      backBtnProps={{
        onClick: (e) => dispatch(createCourseStepperActions.setPage(5)),
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <ADD_CONTENT_CONTEXT.Provider value={{ currentSelected: selected }}>
          <GridComp container spacing={2}>
            <GridComp item style={{ paddingLeft: "1rem" }} xs={3}>
              <Paper>
                <List
                  listSkeleton={listItems}
                  onItemClick={itemClickHandler}
                  heading="Chapters"
                />
              </Paper>
            </GridComp>
            <GridComp item xs={9}>
              {!selected.name ? (
                <Alert
                  severity="info"
                  message="Click on the chapter to add Notes and Flashcard"
                />
              ) : (
                selected.name !== "" && (
                  <Paper style={{ width: "95%", margin: "0 auto" }}>
                    <Box style={{ padding: "1rem" }}>
                      <StackComp>
                        <Typography variant="h6">{selected.label}</Typography>
                        <Tabs tabs={tabs} />
                      </StackComp>
                    </Box>
                  </Paper>
                )
              )}
            </GridComp>
          </GridComp>
        </ADD_CONTENT_CONTEXT.Provider>
      )}
    </BaseUI>
  );
};

export default AddSnackFlashCards;
