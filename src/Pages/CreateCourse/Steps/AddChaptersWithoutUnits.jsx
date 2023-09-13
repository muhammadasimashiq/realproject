import React from "react";
import BaseUI from "../BaseUI";
import { useDispatch, useSelector } from "react-redux";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import ListAppender from "../../../Components/UI/ListAppender/ListAppender";
import Alert from "../../../Components/UI/Alert/Alert";
import api from "../../../services";
import PromptSnackbar from "../../../Components/UI/Snackbar/PromptSnackbar";
import ErrorBoundary from './../../../Errors/ErrorBoundary';
import { useSnackbar } from "notistack";
import Loader from "../../../Components/UI/Loader/Loader";


const generateErrorMessage = (value, message) => ({
  value,
  message,
});

const initialError = generateErrorMessage(false, "");

const AddChaptersWithoutUnits = () => {
  const dispatch = useDispatch();
  const courseId = useSelector((state) => state.createCourse.currentCourdId);
  const [chapters, setChapters] = React.useState([]);
  const [chapterId, setChapterId] = React.useState("");
  const [errors, setErrors] = React.useState(initialError);
  const [loading, setLoading] = React.useState(true);
  const [chaptersError, setChaptersError] = React.useState(false); 
  const [deleteChapter, setDeleteChapter] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { enqueueSnackbar } = useSnackbar();


  const sendChapterToApi = async (title, courseId) => {
    let temp = await api.post.createCourse.addChapterToCourse(title, courseId);
    return temp;
  };

  const getCourseDetailsFromApi = async (courseId) => {
    let temp = await api.get.getChapterDetails(courseId);
    return temp;
  };

  const getChaptersFromBackendAndSetToState = async (courseId) => {

    setLoading(true)
    try{
      let temp = await api.get.getChapterDetails(courseId);
  
      const {data}=temp
      if(data){

               setChapters(
          data.chapters.map((chapter) => ({
            ...chapter,
            name: chapter.title,
          }))
        );
      }else{

        throw new Error("OOPS! error occoured while fetching chapters")
    }
    }catch(error){
      setChaptersError(true)
      enqueueSnackbar("OOPS! error occoured while fetching chapters", {
        variant: "error",
        autoHideDuration: 4000, 
      });

    }
    setLoading(false)
  };

  const sendHandler = ({ title, courseId }) => {
    sendChapterToApi(title, courseId)
      .then((el) => {
        if (!el.error) {
          getChaptersFromBackendAndSetToState(el.data.courseId);
          return true;
        }
      })
      .catch((err) => console.error(err));
  };

  const updateChapterApiCall = async (e) => {
    setLoading(true)



    try{
        const result=await api.put.editChapter(e.id,e.name);


    const {error} =result
    if(error){

      throw new Error("OOPS! error occoured while Updating chapters")

    }else{


      getChaptersFromBackendAndSetToState(courseId);
      enqueueSnackbar("Chapter updated successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });

       } 
      }catch(error){
        setLoading(false)


        enqueueSnackbar("OOPS! error occoured while updating chapter ", {
          variant: "error",
          autoHideDuration: 4000,
        });

      }
  }


  const deleteApiCall = async () => {
    let result = await api.delete.deleteChapter(chapterId);

    const {error} =result
    if(error){
      enqueueSnackbar("OOPS! error occoured while deleting unit", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }else{
      getChaptersFromBackendAndSetToState(courseId);
      enqueueSnackbar("Unit delete successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    
       } 
       setDeleteChapter({ ...deleteChapter, open: false });

  };

  const deleteHandler = (chapterId) => {
    setChapterId(chapterId)
    setDeleteChapter({  ...deleteChapter,open: true });
  };
  const chapterSideEffectWithoutUnit = (e, type) => {
    if (type === "delete") {
      deleteHandler(e.id);
    }
    if (type === "add") {
      const courseIdCopy = courseId;
      sendHandler({ title: e, courseId: courseIdCopy });
    }
    if (type === "update") {
      updateChapterApiCall(e)
    }
  };

  const generateEmptyError = () => {
    if (chapters.length === 0) {
      setErrors(
        generateErrorMessage(true, "Please select atleast one chapter!")
      );
      return true;
    }

    setErrors(initialError);
    return false;
  };

  const initLoad = ({ courseId }) => {
    getChaptersFromBackendAndSetToState(courseId);
  };

  React.useEffect(() => {
    let courseIdCopy = courseId;
    const payload = {
      courseId: courseIdCopy,
    };
    initLoad(payload);
  }, []);

  React.useEffect(() => {
    generateEmptyError();
  }, [chapters]);

  return (
    <>
    {
    loading? <Loader />:
    chaptersError?(
      <>
      <Alert severity="error" message="Error while Chapters courses" />
    </>):
    <div>
      <BaseUI
        title="Add Chapters"
        forwardBtnProps={{
          disabled: errors.value,
          onClick: (e) => {
            e.preventDefault();
            dispatch(createCourseStepperActions.setPage(4));
          },
        }}
        backBtnProps={{
          onClick: (e) => {
            e.preventDefault();
            dispatch(createCourseStepperActions.setPage(1));
          },
        }}
      >
        <ErrorBoundary>
        <ListAppender
          sideEffects={chapterSideEffectWithoutUnit}
          label="Enter Chapter Name"
          type="Chapter"
          list={chapters}
        />
        </ErrorBoundary>
            <PromptSnackbar
        setState={setDeleteChapter}
        state={deleteChapter}
        clickHandler={deleteApiCall}
      >
        Do you want to Delete this Chapter?
      </PromptSnackbar>
      </BaseUI>
    </div>
}
</>
  );
};

export default AddChaptersWithoutUnits;
