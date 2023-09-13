import React from "react";
import BaseUI from "../BaseUI";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../../../Components/UI/Accordion/Accordion";
import ListAppender from "../../../Components/UI/ListAppender/ListAppender";
import api from "./../../../services";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";
import { useSnackbar } from "notistack";
import PromptSnackbar from "../../../Components/UI/Snackbar/PromptSnackbar";
import baseUrl from "../../../config/baseUrl";
import Loader from "../../../Components/UI/Loader/Loader";
import Alert from "../../../Components/UI/Alert/Alert";

const AddSnacks = (props) => {
  const [chaps, setChaps] = React.useState([]);
  const [allChapters, setAllChapters] = React.useState([]);
  const [currentCourse, setCurrentCourse] = React.useState([]);
  const [deletedSnackId, setDeletedSnackId] = React.useState("");
  const [chapterId, setChapterId] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [snacksError, setSnacksError] = React.useState(false);
  const [deleteSnack, setDeleteSnack] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const previousIds = useSelector((state) => state.createCourse);
  const { currentCourdId: previousCourseId } = previousIds;
  const { enqueueSnackbar } = useSnackbar();

  let token = localStorage.getItem("auth-token");
  const getChapetrsAPI = async () => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let getChaptersURL = `${baseUrl}/chapter/${previousCourseId}?course=true`;
    await fetch(getChaptersURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { rows } = result.data;
        setAllChapters(rows);
        setLoading(false);
      })
      .catch((error) => {
        setSnacksError(true);
        setLoading(false);
        enqueueSnackbar("OOPS! error occoured while fetching Chapters", {
          variant: "error",
          autoHideDuration: 4000,
        });
      });
  };
  const deleteApiCall = async () => {
    const result = await api.delete.deleteSnack(deletedSnackId);

    const { error } = result;

    if (error) {
      enqueueSnackbar("OOPS! error occoured while deleting Snack", {
        variant: "error",
        autoHideDuration: 4000,
      });
    } else {
      let temp = [...chaps];

      const chapterToAmmend = temp.find((el) => el.id === chapterId);

      const updatedSnacks = chapterToAmmend.snacks.filter(
        (item) => item.id !== deletedSnackId
      );

      const updatedChaps = chaps.map((chapter) => {
        if (chapter.id === chapterId) {
          chapter.snacks = updatedSnacks;
        }
        return chapter;
      });
      setChaps(updatedChaps);

      enqueueSnackbar("Snack delete successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }

    setDeleteSnack({ ...deleteSnack, open: false });
  };

  const deleteHandler = (snackId, chapterId) => {
    setChapterId(chapterId);
    setDeletedSnackId(snackId);
    setDeleteSnack({ ...deleteSnack, open: true });
  };

  const updateSnackApiCall = async (e) => {
    try {
      const result = await api.put.editSnack(e.id, e.name);
      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating chapters");
      } else {
        let temp = [...chaps];
        const chapToAmmend = temp.find((ch) => ch.id === e.chapterId);

        chapToAmmend.snacks.map((snack) => {
          if (snack.id === e.id) {
            snack.name = e.name;
          }
          return snack;
        });
        setChaps(temp);
        enqueueSnackbar("Chapter updated successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      enqueueSnackbar("OOPS! error occoured while updating chapter", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };

  const snackSideEffectHandler = async (e, type, id) => {
    if (type === "add") {
      const currentChapId = chaps.find((ch) => ch.id === id);
      let title = e;
      let courseId = previousCourseId;
      let chapterId = currentChapId.id;

      let snackValues = { title, courseId, chapterId };
      const result = await api.post.createCourse.addSnacksToChapter(
        snackValues
      );
      const { error, data } = result;
      if (error) {
        console.log("errror occured");
      } else {
        let temp = [...chaps];
        const chapToAmmend = temp.find((ch) => ch.id === data.chapterId);
        chapToAmmend.snacks.push(data);
        setChaps(temp);
      }
    } else if (type === "update") {
      updateSnackApiCall(e);
    } else if (type === "delete") {
      deleteHandler(e.id, e.chapterId);
    }
  };

  const getCourseFromDB = async (courseID) => {
    // let temp = await api.get.getChapterDetails(courseID);

    let temp = await api.get.getCoursesList();

    if (!temp.error) {
      const tempCourse = temp.data.rows.find(
        (eachCourse) => eachCourse.id === courseID
      );

      return setCurrentCourse(tempCourse);
    }
  };

  // const getCourseContent = (currentCourdId) => {
  //   getCourseFromDB(currentCourdId)
  //   .then((el) =>{

  //     setCurrentCourse([...el.data.snacks])
  //   });
  // };

  React.useEffect(() => {}, [chaps]);
  React.useEffect(() => {
    getCourseFromDB(previousCourseId);
    getChapetrsAPI();
  }, []);

  const snackAgainstChapter = () => {
    let temp = [...allChapters].map((chapter) => {
      if (currentCourse.id && currentCourse.snacks.length > 0) {
        const snacksAgainstCurrentChapter = currentCourse.snacks.filter(
          (each) => each.chapterId === chapter.id
        );
        return { ...chapter, snacks: [...snacksAgainstCurrentChapter] };
      }
      return { ...chapter, snacks: [] };
    });

    setChaps(temp);
  };

  React.useEffect(() => {
    snackAgainstChapter();
  }, [allChapters, currentCourse]);

  const accordions_controller = chaps.map((chapter, index) => {
    console.log("chapter", chapter);
    return {
      name: chapter.title,
      content: (
        <ListAppender
          // sideEffects={(name) => snackSideEffectHandler(name, chapter)}
          sideEffects={snackSideEffectHandler}
          label="Enter Snack Name"
          list={chapter.snacks
            .sort((a, b) => a.id - b.id)
            .map((el) => ({
              name: el.title,
              chapterId: chapter.id,
              ...el,
            }))}
          type="Snackbar"
          unitId={chapter.id}
        />
      ),
      panelHeading: `Chapter ${index + 1}`,
      panelDescription: chapter.title,
    };
  });
  console.log("accordions_controller", accordions_controller);
  const dispatch = useDispatch();
  return (
    <>
      {loading ? (
        <Loader />
      ) : snacksError ? (
        <>
          <Alert severity="error" message="Error while fetching Chapters " />
        </>
      ) : (
        <BaseUI
          forwardBtnProps={{
            onClick: (e) => {
              e.preventDefault();
              dispatch(createCourseStepperActions.setPage(5));
            },
          }}
          backBtnProps={{
            onClick: (e) => {
              e.preventDefault();
              dispatch(createCourseStepperActions.setPage(3));
            },
          }}
          title="Add Snacks to Chapters"
        >
          <ErrorBoundary>
            <Accordion accordion_controls={accordions_controller} />
          </ErrorBoundary>
          <PromptSnackbar
            setState={setDeleteSnack}
            state={deleteSnack}
            clickHandler={deleteApiCall}
          >
            Do you want to Delete this Snack?
          </PromptSnackbar>
        </BaseUI>
      )}
    </>
  );
};

export default AddSnacks;
