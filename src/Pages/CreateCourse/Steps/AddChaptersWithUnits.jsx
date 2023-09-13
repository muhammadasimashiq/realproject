import React from "react";
import BaseUI from "../BaseUI";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../../../Components/UI/Accordion/Accordion";
import ListAppender from "../../../Components/UI/ListAppender/ListAppender";
import Alert from "../../../Components/UI/Alert/Alert";
import api from "./../../../services";
import PromptSnackbar from "../../../Components/UI/Snackbar/PromptSnackbar";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";
import { useSnackbar } from "notistack";
import Loader from "../../../Components/UI/Loader/Loader";

const AddChaptersWithUnits = (props) => {
  const [deletedUnitId, setDeletedUnitId] = React.useState("");
  const [chapterId, setChapterId] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [chaptersError, setChaptersError] = React.useState(false);

  const [deleteChapter, setDeleteChapter] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [incompleteUnits, setIncompleteUnits] = React.useState({
    value: false,
    message: "",
  });
  const [currentCourse, setCurrentCourse] = React.useState({});
  const [units, setUnits] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const previousIds = useSelector((state) => state.createCourse);
  const { currentCourdId: previousCourseId } = previousIds;

  const getUnitListApi = async (previousCourseId) => {
    if (previousCourseId === undefined) {
      alert("Course ID is undefined, Please reload the page");
    } else {
      setLoading(true);
      try {
        let temp = await api.get.getUnits(previousCourseId);

        const { rows } = temp;
        if (rows) {
          setAllUnits([...temp.rows]);
        } else {
          throw new Error("OOPS! error occoured while fetching chapters");
        }
      } catch (error) {
        setChaptersError(true);
        enqueueSnackbar("OOPS! error occoured while fetching chapters", {
          variant: "error",
          autoHideDuration: 4000,
        });
      }
      setLoading(false);
    }
  };

  const deleteApiCall = async () => {
    const result = await api.delete.deleteChapter(chapterId);
    const { error } = result;
    if (error) {
      enqueueSnackbar("OOPS! error occoured while deleting unit", {
        variant: "error",
        autoHideDuration: 4000,
      });
    } else {
      let temp = [...units];

      let unitToAmmend = temp.find((el) => el.id === deletedUnitId);
      unitToAmmend = unitToAmmend.chapters.filter(
        (item) => item.id !== chapterId
      );

      const updatedUnits = units.map((unit) => {
        if (unit.id === deletedUnitId) {
          unit.chapters = unitToAmmend;
        }
        return unit;
      });
      setUnits(updatedUnits);
      enqueueSnackbar("Chapter delete successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
    setDeleteChapter({ ...deleteChapter, open: false });
  };

  const updateChapterApiCall = async (e) => {
    try {
      const result = await api.put.editChapter(e.id, e.name);
      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating chapters");
      } else {
        let temp = [...units];

        let unitToAmmend = temp.find((el) => el.id === e.unitId);

        unitToAmmend = unitToAmmend.chapters.map((chap) => {
          if (chap.id === e.id) {
            chap.name = e.name;
            chap.title = e.name;
          }
          return chap;
        });

        const updatedUnits = units.map((unit) => {
          if (unit.id === e.unitId) {
            unit.chapters = unitToAmmend;
          }
          return unit;
        });
        setUnits(updatedUnits);
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

  const deleteHandler = (chapterId, unitId) => {
    setDeletedUnitId(unitId);
    setChapterId(chapterId);
    setDeleteChapter({ ...deleteChapter, open: true });
  };
  const chapterSideEffectHandler = async (e, type, unitId) => {
    // const currentId = units.find((el) => {
    //   return el.id === unit.id;
    // });
    if (type === "add") {
      const title = e;
      const courseId = previousCourseId;

      let chapterValues = { title, courseId, unitId };
      let tempChapters = await api.post.createCourse.addChapterToUnit(
        chapterValues
      );
      const { data } = tempChapters;

      let temp = [...units];

      const unitToAmmend = temp.find((el) => el.id === data.unitId);

      unitToAmmend.chapters.push(data);

      setUnits(temp);
    } else if (type === "update") {
      updateChapterApiCall(e);
    } else if (type === "delete") {
      deleteHandler(e.id, e.unitId);
    }
  };

  const getCurrentCourse = async (courseID) => {
    let temp = await api.get.getCoursesList();

    if (!temp.error) {
      const tempCourse = temp.data.rows.find(
        (eachCourse) => eachCourse.id === courseID
      );
      return setCurrentCourse(tempCourse);
    }
  };

  React.useEffect(() => {}, [units]);
  React.useEffect(() => {
    getCurrentCourse(previousCourseId);
    getUnitListApi(previousCourseId);
  }, []);

  React.useEffect(() => {
    let temp = [...allUnits].map((unit) => {
      if (currentCourse.id && currentCourse.chapters.length > 0) {
        const tempChapters = currentCourse.chapters.filter(
          (el) => unit.id === el.unitId
        );
        return { ...unit, chapters: [...tempChapters] };
      }
      return { ...unit, chapters: [] };
    });

    setUnits(temp);
  }, [allUnits, currentCourse]);

  React.useEffect(() => {
    let temp = { ...incompleteUnits };
    const chapterIsMissingTest = units.every(
      (unit) => unit.chapters.length > 0
    );
    temp.value = !chapterIsMissingTest;
    temp.message = "Each unit must contain atleast one chapter!";
    setIncompleteUnits(temp);
  }, [units]);
  units.sort((a, b) => {
    return a.id - b.id;
  });
  console.log("unitss", units);
  const accordions_controller = units.map((unit, index) => {
    if (unit) {
      return {
        name: unit.title,
        content: (
          <ListAppender
            // sideEffects={(name) => chapterSideEffectHandler(name, unit)}
            sideEffects={chapterSideEffectHandler}
            list={unit.chapters.map((el) => ({
              name: el.title,
              unitId: unit.id,
              ...el,
            }))}
            type="Chapter"
            hasAutoScroll={true}
            unitId={unit.id}
            label="Enter Chapter Name"
          />
        ),
        panelHeading: `Unit ${index + 1}`,
        panelDescription: unit.title,
      };
    }
  });

  const dispatch = useDispatch();
  return (
    <>
      {loading ? (
        <Loader />
      ) : chaptersError ? (
        <>
          <Alert severity="error" message="Error while Chapters courses" />
        </>
      ) : (
        <BaseUI
          forwardBtnProps={{
            disabled: incompleteUnits.value,
            onClick: (e) => {
              e.preventDefault();
              dispatch(createCourseStepperActions.setPage(4));
            },
          }}
          backBtnProps={{
            onClick: (e) => {
              e.preventDefault();
              dispatch(createCourseStepperActions.setPage(2));
            },
          }}
          title="Add Chapters to Units"
        >
          <ErrorBoundary>
            <Accordion accordion_controls={accordions_controller} />
          </ErrorBoundary>
          {incompleteUnits.value && (
            <Alert message={incompleteUnits.message} severity="warning" />
          )}
          <PromptSnackbar
            setState={setDeleteChapter}
            state={deleteChapter}
            clickHandler={deleteApiCall}
          >
            Do you want to Delete this Chapter?
          </PromptSnackbar>
        </BaseUI>
      )}
    </>
  );
};

export default AddChaptersWithUnits;
