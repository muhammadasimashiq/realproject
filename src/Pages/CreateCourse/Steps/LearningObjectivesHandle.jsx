import React, { useState } from "react";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";
import Typography from "../../../Components/UI/Typography/Typography";
import { capitalize } from "../../../helpers/capitalize";
import EditorAppender from "../../../Components/UI/EditorAppender/EditorAppender";
import { useSelector } from "react-redux";
import api from "./../../../services";
import Alert from "./../../../Components/UI/Alert/Alert";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";
import PromptSnackbar from "../../../Components/UI/Snackbar/PromptSnackbar";
import { useSnackbar } from "notistack";
import baseUrl from "../../../config/baseUrl";
import Model from "../../../Components/UI/Modal/Modal";
import EditLearningObjectives from "./EditLearningObjectives";
import EditModal from "./EditModal";

const buildEditMode = (editMode, learningObj, chapterId) => ({
  value: editMode,
  anchor: {
    learningObj: learningObj,
    chapterId: chapterId,
  },
});

const LearningObjectivesHandle = ({
  selected,
  chapterName,
  refreshObjectives,
}) => {
  const [learningObj, setLearningObj] = React.useState([]);
  const [currentCourse, setCurrentCourse] = useState([]);
  const [arr, setArr] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deletedLearningObjId, setDeletedLearningObjId] = React.useState("");
  const [editMode, setEditMode] = React.useState({
    value: false,
    anchor: {
      learningObj: null,
      chapterId: null,
    },
  });

  const changeEditModeHandler = (editMode, learningObj, chapterId) => {
    setEditMode({ ...buildEditMode(editMode, learningObj, chapterId) });
  };

  const [deleteLearningObj, setDeleteLearningObj] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const previousIds = useSelector((state) => state.createCourse);
  const { currentCourdId: previousCourseId } = previousIds;
  const { enqueueSnackbar } = useSnackbar();

  let token = localStorage.getItem("auth-token");

  const deleteApiCall = async () => {
    const result = await api.delete.deleteLearningObjective(
      deletedLearningObjId
    );

    const { error } = result;
    if (error) {
      enqueueSnackbar(
        "OOPS! error occoured while deleting Learning Objective",
        {
          variant: "error",
          autoHideDuration: 4000,
        }
      );
    } else {
      const upudatedData = arr.filter(
        (element) => element.id !== deletedLearningObjId
      );
      setArr(upudatedData);
      enqueueSnackbar("Learning Objective delete successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
    setDeleteLearningObj({ ...deleteLearningObj, open: false });
    refreshObjectives();
  };

  const deleteHandler = (learningObjId) => {
    setDeletedLearningObjId(learningObjId);
    setDeleteLearningObj({ ...deleteLearningObj, open: true });
  };

  const editHandler = (learningObjId, chapterId) => {
    changeEditModeHandler(true, learningObjId, chapterId);
  };

  const sideEffectsHandler = (e, chapterId) => {
    switch (e.type) {
      case "delete": {
        deleteHandler(e.id);
        break;
      }

      case "edit": {
        editHandler(e.id, chapterId);
        break;
      }

      default: {
        learningObjectivesHandler(e, chapterId);
        setOpen(false);
        break;
      }
    }
  };

  const learningObjectivesHandler = async (e, chapterId) => {
    let tempPostReq = await api.post.addLearningObjectivesToChapter(
      e,
      chapterId,
      previousCourseId
    );

    const { data, error } = tempPostReq;

    if (!error) {
      const object = {
        title: JSON.parse(data.title),
        id: data.id,
      };

      let temp = [...arr];

      temp.push(object);

      setArr(temp);
      refreshObjectives();
    }
  };

  const getLearningObjectivesFromAPIHandler = () => {
    const chapterLearningOjbective = currentCourse?.map((el, index) => {
      const object = {};
      object.title = JSON.parse(el.title);
      object.id = el.id;

      return object;
    });
    chapterLearningOjbective?.sort((a, b) => {
      return a.id - b.id;
    });
    setArr(chapterLearningOjbective);
  };

  React.useEffect(() => {
    if (currentCourse) getLearningObjectivesFromAPIHandler();
  }, [currentCourse]);

  const onSelectionChange = () => {
    setLearningObj((prevState) => []);
    setCurrentCourse(selected.learningObjectives);
  };

  React.useEffect(() => {
    onSelectionChange();
  }, [selected]);

  const handleSaved = ({ response }) => {
    let { data } = response;

    if (data && Object.keys(data).length) {
      let _currentCourse = [...currentCourse];
      for (let i = 0; i < _currentCourse.length; i++) {
        if (_currentCourse[i].id === data.id) {
          _currentCourse[i] = data;
        }
      }
      setCurrentCourse(_currentCourse);
      refreshObjectives();
      // let _chapters = [...chapterList];
      // _chapters[chapterIndex].learningObjectives = _currentCourse;

      // setChapterList(_chapters);
    }
    changeEditModeHandler(false);
  };
  // React.useEffect(() => {
  //   if (selected) {
  //     setLearningObj(selected.learningObjective);
  //   }
  // }, [selected]);

  return (
    <StackComp>
      {!chapterName ? (
        <Alert
          severity="info"
          message="Click on the chapter to add Learning Objectives"
        />
      ) : (
        <>
          <ErrorBoundary>
            <Typography variant="h5">Learning Objectives</Typography>
            <Typography variant="h6">{capitalize(chapterName)}</Typography>

            {
              <EditorAppender
                label="Enter Learning Objectives"
                type="Learning Objectives"
                setList={setArr}
                list={learningObj}
                sideEffects={(e) => sideEffectsHandler(e, selected.id)}
                arr={arr}
                open={open}
                setOpen={setOpen}
              />
            }
          </ErrorBoundary>
        </>
      )}
      <Model
        width="74vw"
        open={editMode.value}
        handleClose={(e) => changeEditModeHandler(false, null, null)}
        setOpen={(val) => changeEditModeHandler(val, null, null)}
      >
        <EditLearningObjectives
          triggerSaved={(e) => {
            handleSaved(e);
          }}
          {...editMode.anchor}
        />
      </Model>
      <PromptSnackbar
        setState={setDeleteLearningObj}
        state={deleteLearningObj}
        clickHandler={deleteApiCall}
      >
        Do you want to Delete learning objective?
      </PromptSnackbar>
    </StackComp>
  );
};

export default LearningObjectivesHandle;

LearningObjectivesHandle.defaultProps = {
  chapterName: "no chapter name given",
};
