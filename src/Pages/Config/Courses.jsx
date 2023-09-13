import React from "react";
import Typography from "./../../Components/UI/Typography/Typography";
import Table from "../../Components/UI/Table/Table";
import Button from "./../../Components/UI/Button/Button";
import Stack from "./../../Components/UI/Layout/Stack/Stack";
import Modal from "./../../Components/UI/Modal/Modal";
import TextFieldComp from "../../Components/UI/Input/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOffIcon from "@mui/icons-material/EditOff";
import CourseModel from "./CoursesModel";
import api from "./../../services";
import { useSnackbar } from "notistack";
import PromptSnackbar from "./../../Components/UI/Snackbar/PromptSnackbar";
import ErrorBoundary from "./../../Errors/ErrorBoundary";
import Loader from "./../../Components/UI/Loader/Loader";

const Courses = (props) => {
  const [addCategModal, setAddCategModal] = React.useState(false);
  const [openCourseModel, setOpenCourseModel] = React.useState(false);
  const [dataIsLoading, setDataIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const [course, setCourse] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [deleteSubject, setDeleteSubject] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = (newState) => {
    setDeleteSubject({ open: true, ...newState });
  };

  const getSubjectsHandler = async () => {
    let temp = await api.get.getSubjects();
    setData([
      ...temp.data.rows.map((row) => ({
        ...row,
        courses: row.title.charAt(0).toUpperCase() + row.title.slice(1),
      })),
    ]);
    setDataIsLoading(false);
  };

  React.useEffect(() => {
    setDataIsLoading(true);
    getSubjectsHandler();
  }, []);

  const fields = [
    { field: "id" },
    { field: "courses", headerName: "Courses", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => {
              setSelected({ ...params });
              setOpenCourseModel(true);
            }}
          >
            <EditOffIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{ color: "red" }}
            onClick={() => {
              handleClick({
                vertical: "top",
                horizontal: "center",
              });
              setSelected({ ...params });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const deleteSubjectHandler = async (e) => {
    const result = await api.delete.deleteSubject(selected.row.id);
    const { error } = result;
    if (!error) {
      enqueueSnackbar("Subject deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      enqueueSnackbar(
        "OOPS! error occoured while deleting subject, Please try again",
        {
          variant: "error",
          autoHideDuration: 4000,
        }
      );
    }
    getSubjectsHandler();
    setDeleteSubject({ ...deleteSubject, open: false });
  };

  const updateHandler = async (e) => {
    try {
      let result = await api.put.editSubject(selected.row.id, e);

      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating Course");
      } else {
        getSubjectsHandler();
        setOpenCourseModel(false);

        enqueueSnackbar("Course updated successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      setOpenCourseModel(false);
      enqueueSnackbar("OOPS! error occoured while updating Course", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };

  const getSubjectHandler = async () => {
    await api.post.addSubjects(course);

    getSubjectsHandler();

    setAddCategModal(false);
  };

  const handleCloseModal = () => {
    setAddCategModal(false);
    setOpenCourseModel(false);
  };
  return (
    <React.Fragment>
      <Stack>
        <Button onClick={(e) => setAddCategModal(true)} width="10rem">
          Add New Course
        </Button>
        <ErrorBoundary>
          {dataIsLoading ? (
            <Loader />
          ) : (
            <Table tableData={data} cols={fields} />
          )}
        </ErrorBoundary>
      </Stack>
      <Modal
        title="Add Levels"
        open={addCategModal}
        handleClose={handleCloseModal}
      >
        <Stack>
          <Typography variant="h6">Add Courses</Typography>
          <TextFieldComp
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            label="Add course name"
          />
          <Button
            onClick={getSubjectHandler}
            style={{ alignSelf: "center", width: "10rem" }}
          >
            Save Course
          </Button>
        </Stack>
      </Modal>
      <Modal open={openCourseModel} handleClose={handleCloseModal}>
        <CourseModel
          updateHandler={(e) => updateHandler(e)}
          selected={selected}
        />
      </Modal>
      <PromptSnackbar
        // triggerYes={(e) => setRandomState("yes")}
        setState={setDeleteSubject}
        state={deleteSubject}
        clickHandler={deleteSubjectHandler}
      >
        Do you want to Delete this subject?
      </PromptSnackbar>
    </React.Fragment>
  );
};

export default Courses;
