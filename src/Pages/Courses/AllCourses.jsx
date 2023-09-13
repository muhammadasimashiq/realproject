import React from "react";
import Grid from "./../../Components/UI/Layout/Grid/Grid";
import Stack from "./../../Components/UI/Layout/Stack/Stack";
import Card from "../../Components/UI/Card/Card";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import PromptSnackbar from "./../../Components/UI/Snackbar/PromptSnackbar";
import api from "./../../services";
import Loader from "../../Components/UI/Loader/Loader";
import Alert from "./../../Components/UI/Alert/Alert";
import { useSnackbar } from "notistack";
import ErrorBoundary from "./../../Errors/ErrorBoundary";

const AllCourses = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [subjects, setSubjects] = React.useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [allCoursesError, setAllCoursesError] = React.useState(false);

  const getSubjectsHandler = async () => {
    setLoading(true);
    try {
      let temp = await api.get.getSubjects();
      const { error } = temp;
      if (error) {
        throw error;
      } else {
        setSubjects([
          ...temp.data.rows.map((row) => ({ ...row, name: row.title })),
        ]);
        setAllCoursesError(false);
      }
    } catch (error) {
      setAllCoursesError(true);
      enqueueSnackbar("OOPS! error occoured while fetching courses", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
    setLoading(false);
  };

  const [deleteSubject, setDeleteSubject] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const handleClick = (newState, id) => () => {
    setSelectedSubjectId(id);
    setDeleteSubject({ open: true, ...newState });
  };

  React.useEffect(() => {
    getSubjectsHandler();
  }, []);
  const deleteSubjectHandler = async () => {
    const result = await api.delete.deleteSubject(selectedSubjectId);
    const { error } = result;
    if (error) {
      enqueueSnackbar(
        "OOPS! error occoured while deleting subject, Please try again",
        {
          variant: "error",
          autoHideDuration: 4000,
        }
      );
    } else {
      enqueueSnackbar("Course deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      const newData = subjects.filter((item) => item.id !== selectedSubjectId);
      setSubjects(newData);
    }
    setDeleteSubject({ ...deleteSubject, open: false });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <ErrorBoundary>
            {allCoursesError ? (
              <>
                <Alert
                  severity="error"
                  message="Error while fetching courses"
                />
              </>
            ) : subjects.length === 0 ? (
              <>
                <Alert severity="info" message="No course added" />
              </>
            ) : (
              subjects.map((subject, index) => (
                <Grid item xs={3} key={index}>
                  <Card
                    stackProps={{
                      height: "10rem",
                      justifyContent: "space-between",
                    }}
                    title={subject.name}
                  >
                    <Stack direction="row" justifyContent="flex-end" gap={1}>
                      {/* dont delete below commented iconButton. we can use this in future */}

                      {/* <IconButton
                  onClick={(e) =>
                    navigate(`/courses/${subject.name}`, {
                      replace: true,
                      state: subject,
                    })
                  }
                  color="primary"
                >
                  <MdEdit />
                </IconButton> */}
                      <IconButton
                        color="error"
                        onClick={handleClick(
                          {
                            vertical: "top",
                            horizontal: "center",
                          },
                          subject.id
                        )}
                      >
                        <MdDelete />
                      </IconButton>
                    </Stack>
                  </Card>
                </Grid>
              ))
            )}
          </ErrorBoundary>
          <PromptSnackbar
            // triggerYes={(e) => setRandomState("yes")}
            setState={setDeleteSubject}
            state={deleteSubject}
            clickHandler={deleteSubjectHandler}
          >
            Do you want to Delete this course?
          </PromptSnackbar>
        </React.Fragment>
      )}
    </>
  );
};

export default AllCourses;
