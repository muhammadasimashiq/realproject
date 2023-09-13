import React, { useState } from "react";
import Select from "./../../../Components/UI/Input/Select";
import Checkbox from "./../../../Components/UI/Input/Checkbox";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import { createCourseActions } from "../../../redux/reducers/createCourse.js";
import { BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import BaseUI from "../BaseUI";
import { useNavigate } from "react-router-dom";
import Loader from "./../../../Components/UI/Loader/Loader";
import api from "./../../../services";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Alert from "./../../../Components/UI/Alert/Alert";

const StyledSelect = styled(Select)(({ theme }) => ({
  width: "20rem",
}));
const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: "6px 6px 0px 0px",
}));
const Upload = styled("div")(({ theme }) => ({
  border: "1px solid black",
  borderRadius: "6px",
  cursor: "pointer",
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
}));

const ConfigureCourse = ({ hasUnits, getHasUnits, courseHasUnits }) => {
  const navigate = useNavigate();
  const courseID = useSelector((state) => state.createCourse.currentCourdId);
  const [show, setShow] = React.useState(false);
  const [level, setLevel] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState({});
  const [selectedLevel, setSelectedLevel] = React.useState({});
  const [levels, setLevels] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [preview, setPreview] = React.useState();
  const [imageBase64, setImageBase64] = React.useState();
  const [imageValidation, setImageValitdation] = React.useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [courses, setCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState({});
  const [showNextButton, setShowNextButton] = React.useState(false);

  const dispatch = useDispatch();
  let title = "some-title";

  const moveToPageTwo = (courseID) => {
    dispatch(createCourseActions.currentCourseId(courseID));
    dispatch(createCourseStepperActions.setPage(2));
    setShowLoader(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const standardId = level;
    const subjectId = subject;
    const haveUnits = hasUnits;
    const image = imageBase64;
    const courseValues = { standardId, subjectId, haveUnits, image, title };
    let temp = await api.post.createCourse.createCourseStageOne(courseValues);

    let courseID = temp?.data?.id;

    if (temp.error) {
      let errorIsUniquenessConstraint = temp.customErrors.errors.find(
        (eachError) =>
          eachError.type === "unique constraint violation" ||
          eachError.type === "notNull Violation"
      );

      if (!errorIsUniquenessConstraint) {
        return;
      }
    }
    moveToPageTwo(courseID);
  };

  const getLevelsHandler = async () => {
    let temp = await api.get.getLevel();
    setLevels([...temp.data.rows]);
  };

  const getSubjectHandler = async () => {
    let temp = await api.get.getSubjects();
    setSubjects([...temp.data.rows]);
  };

  React.useEffect(() => {
    getLevelsHandler();
    getSubjectHandler();
  }, []);

  const imageHandler = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImageBase64(fileReader.result);
      setShowNextButton(true)
      setImageValitdation(false)
    };
    setPreview(objectUrl);
  };

  const getCoursesListHandler = async () => {
    let temp = await api.get.getCoursesList();
    if (temp.error) {
      return console.error("ERROR", temp);
    }
    setCourses([...temp.data.rows]);
  };

  const clickCheckCourseHandler = (e) => {
    e.preventDefault();
    const foundCourse = courses.find(
      (eachCourse) =>
        selectedLevel.id === eachCourse.gradeLevel.id &&
        selectedSubject.id === eachCourse.subject.id
    );
    setSelectedCourse(foundCourse);
    if(foundCourse){
      setShowNextButton(true)
    } 
    setShow(true);
    
  };

  const showBtnAndContent = (bool) => {
    setShow(bool);
    setShowNextButton(bool);
    
  };

  React.useEffect(() => {
    getCoursesListHandler();
  }, []);

  React.useEffect(() => {
    showBtnAndContent(false);
  }, [selectedLevel, selectedSubject]);

  React.useEffect(() => {
    if (selectedCourse) {
      courseHasUnits(selectedCourse.haveUnits);
    } else courseHasUnits(false);
  }, [selectedCourse]);

  const handleSubmit = (e) => {
    return submitHandler(e);
  };

 
  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <BaseUI
            forwardBtnProps={{
              disabled:  !showNextButton  
            }}
            title="Configure Course"
            backBtnText="Cancel"
            backBtnProps={{
              onClick: (e) => {
                navigate("/courses", { replace: "true" });
              },
            }}
          >
            <Alert
              severity="info"
              message="please select level and subject to configure the course"
            />

            <StyledSelect
              value={level}
              onChange={(e) => {
                const getLevel = levels.find(
                  (each) => each.id === e.target.value
                );
                // REMOVE SET LEVEL LATER
                setLevel(e.target.value);
                setSelectedLevel(getLevel);
              }}
              options={levels}
              label="Select Level"
            />
            <StyledSelect
              value={subject}
              onChange={(e) => {
                const getSubject = subjects.find(
                  (each) => each.id === e.target.value
                );
                // REMOVE SET SUBJECT LATER
                setSelectedSubject(getSubject);
                setSubject(e.target.value);
              }}
              options={subjects}
              label="Select Subject"
            />
            <div>
              <IconButton
                onClick={(e) => {
                  clickCheckCourseHandler(e);
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            {show && (
              <>
                {selectedCourse && selectedCourse.published ? (
                  <Alert
                    severity="info"
                    message="This course is already Published!  if you want to edit course Please click on the next button"
                  />
                ) : (
                  <>
                    <input
                      onChange={imageHandler}
                      id="img"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {/* WE HAVE TO DO THE CHECKBOX FUNCTIONALITY IN IMAGES ALSO WHEN WE GET API */}
                    <Upload>
                      <Image src={preview} />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <BiUpload />
                        <label
                          htmlFor="img"
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                        >
                          Upload image
                        </label>
                      </div>
                    </Upload>
                    <Checkbox
                      checked={hasUnits}
                      setChecked={(e) => getHasUnits(e)}
                      label="Does this course have units?"
                    />
                  </>
                )}
              </>
            )}
          </BaseUI>
        </form>
      )}
    </>
  );
};

export default ConfigureCourse;
