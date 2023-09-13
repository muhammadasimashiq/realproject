import React, { useState } from "react";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import { useDispatch } from "react-redux";
import { createCourseActions } from "../../../redux/reducers/createCourse.js";
import ListAppender from "./../../../Components/UI/ListAppender/ListAppender";
import BaseUI from "../BaseUI";
import { useSelector } from "react-redux";
import api from "./../../../services";
import PromptSnackbar from "../../../Components/UI/Snackbar/PromptSnackbar";
import { useSnackbar } from "notistack";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";
import Loader from "../../../Components/UI/Loader/Loader";
import Alert from "../../../Components/UI/Alert/Alert";

const AddUnits = () => {
  // const [deletedUnitId, setDeletedUnitId] = useState([]);

  const [units, setUnits] = React.useState([]);
  const [deletedUnitId, setDeletedUnitId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [unitsError, setUnitsError] = React.useState(false);

  const [deleteUnit, setDeleteUnit] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const previousIds = useSelector((state) => state.createCourse);

  const { currentCourdId: previousCourseId } = previousIds;
  const previousCorseId = useSelector(
    (state) => state.createCourse.currentCourdId
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const getUnitHandler = async (courseID) => {
    if (courseID === undefined) {
      alert("ID is undefined please reload the page");
    } else {
      setLoading(true);
      try {
        let temp = await api.get.getUnits(courseID);
        const { rows } = temp;
        if (rows) {
          setUnits([...temp.rows]);
        } else {
          throw new Error("OOPS! error occurred while deleting unit");
        }
      } catch (error) {
        setUnitsError(true);
        enqueueSnackbar("OOPS! error occurred while deleting unit", {
          variant: "error",
          autoHideDuration: 4000,
        });
      }
      setLoading(false);
    }
  };
  const retrieveListHandler = (e) => {
    setUnits(e);
  };

  const deleteApiCall = async () => {
    const result = await api.delete.deleteUnit(deletedUnitId);
    const { error } = result;

    if (error) {
      enqueueSnackbar("OOPS! error occurred while deleting unit", {
        variant: "error",
        autoHideDuration: 4000,
      });
    } else {
      let temp = [...units];
      temp = temp.filter((item) => item.id !== deletedUnitId);
      setUnits(temp);

      enqueueSnackbar("Unit delete successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
    setDeleteUnit({ ...deleteUnit, open: false });
  };

  const updateApiCall = async (e) => {
    try {
      let result = await api.put.editUnit(e.id, e.name);
      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating chapters");
      } else {
        let temp = [...units];
        temp = temp.map((ele) => {
          if (ele.id === e.id) {
            ele.name = e.name;
            ele.title = e.name;
          }
          return ele;
        });
        setUnits(temp);

        enqueueSnackbar("Unit updated successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      enqueueSnackbar("OOPS! error occoured while updating unit", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };

  const deleteHandler = (unitId) => {
    setDeletedUnitId(unitId);
    setDeleteUnit({ ...deleteUnit, open: true });
  };

  const sideEffectsHandler = async (e, type) => {
    if (type === "add") {
      let tempReturn = await api.post.createCourse.addUnitToCourse({
        title: e,
        courseId: previousCorseId,
      });
      let temp = [...units];
      temp.push(tempReturn);
      setUnits(temp);
      dispatch(createCourseActions.currentUnitId(tempReturn.id));
    } else if (type === "update") {
      updateApiCall(e);
    } else if (type === "delete") {
      deleteHandler(e.id);
    }
  };

  React.useEffect(() => {
    getUnitHandler(previousCourseId);
  }, []);
  units.sort((a, b) => {
    return a.id - b.id;
  });
  console.log("new unites", units);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : unitsError ? (
        <>
          <Alert severity="error" message="Error while fetching units" />
        </>
      ) : (
        <>
          <BaseUI
            forwardBtnProps={{
              disabled: !(units.length > 0),
              submitbtntype: "button",
              onClick: (e) => {
                e.preventDefault();
                dispatch(createCourseStepperActions.setPage(3));
              },
            }}
            title="Add Units"
            backBtnProps={{
              onClick: (e) => {
                dispatch(createCourseStepperActions.setPage(1));
              },
            }}
          >
            <ErrorBoundary>
              <ListAppender
                getList={retrieveListHandler}
                list={units.map((el) => ({ name: el.title, ...el }))}
                sideEffects={sideEffectsHandler}
                hasAutoScroll={true}
                type="Unit"
                label="Enter Unit Name"
              />
            </ErrorBoundary>
          </BaseUI>
          <PromptSnackbar
            setState={setDeleteUnit}
            state={deleteUnit}
            clickHandler={deleteApiCall}
          >
            Do you want to Delete this course?
          </PromptSnackbar>
        </>
      )}
    </div>
  );
};

export default AddUnits;
