import React from "react";
import BaseUI from "./../BaseUI";
import List from "./../../../Components/UI/List/List";
import GridComp from "../../../Components/UI/Layout/Grid/Grid";
import ListAppender from "../../../Components/UI/ListAppender/ListAppender";
import Box from "../../../Components/UI/Layout/Box/Box";
import Paper from "../../../Components/UI/Paper/Paper";
import data from "../../../config/mockData/dummy_chapters.json";
import { capitalize } from "../../../helpers/capitalize";
import LearningObjectivesHandle from "./LearningObjectivesHandle";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../../../config/baseUrl";
import { Loader } from "../../../helpers/Loader";

const AddLearningObjectives = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState({ name: "", label: "" });
  const [chapterList, setChapterList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const previousIds = useSelector((state) => state.createCourse);
  const { currentCourdId: previousCourseId } = previousIds;
  let token = localStorage.getItem("auth-token");
  // const getChapetrsAPI = async () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   let getChaptersURL = `${baseUrl}/chapter/${previousCourseId}?course=true`;
  //   await fetch(getChaptersURL, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       const { rows } = result.data;
  //       setChapterList([
  //         ...rows.map((el) => ({
  //           name: el.title.split(" ").join("-"),
  //           label: capitalize(el.title),
  //           ...el,
  //         })),
  //       ]);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       setLoading(false);
  //     });
  // };
  const getChapersWithLearningObjectives = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let getChaptersURL = `${baseUrl}/chapter/learningobjective/${previousCourseId}`;
    await fetch(getChaptersURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        setChapterList([
          ...data.chapters.map((el) => ({
            name: el.title.split(" ").join("-"),
            label: capitalize(el.title),
            ...el,
          })),
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    // getChapetrsAPI();
    getChapersWithLearningObjectives();
  }, []);

  React.useEffect(() => {
    let temp = chapterList.map((ch) => {
      return {
        name: ch.title.split(" ").join("-"),
        label: capitalize(ch.title),
      };
    });
    setChapterList(temp);
  }, []);

  return (
    <BaseUI
      forwardBtnProps={{
        onClick: (e) => dispatch(createCourseStepperActions.setPage(6)),
      }}
      backBtnProps={{
        onClick: (e) => dispatch(createCourseStepperActions.setPage(4)),
      }}
      title="Add Learning Objectives"
    >
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <GridComp container spacing={2}>
          <GridComp item style={{ paddingLeft: "1rem" }} xs={4}>
            <Paper>
              <List
                listSkeleton={chapterList}
                onItemClick={(e) => setSelected(e)}
                heading="Chapter"
              />
            </Paper>
          </GridComp>
          <GridComp item xs={8}>
            <Paper style={{ width: "95%", margin: "0 auto" }}>
              <Box style={{ padding: "1rem" }}>
                <LearningObjectivesHandle
                  selected={selected}
                  chapterName={selected.name}
                  refreshObjectives={getChapersWithLearningObjectives}
                />
              </Box>
            </Paper>
          </GridComp>
        </GridComp>
      )}
    </BaseUI>
  );
};

export default AddLearningObjectives;
