import React from "react";
import ButtonComp from "../../../Components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import Typography from "../../../Components/UI/Typography/Typography";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";
import { useDispatch } from "react-redux";
import { createCourseStepperActions } from "../../../redux/reducers/createCourseStepper";
import ErrorBoundary from "./../../../Errors/ErrorBoundary";

const CompleteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <StackComp gap={4} sx={{ mt: "3rem" }}>
      <ErrorBoundary>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          Course Created Successfully!!
        </Typography>
        <StackComp alignItems="center">
          <ButtonComp
            style={{ width: "10rem" }}
            onClick={(e) => {
              setTimeout(() => {
                dispatch(createCourseStepperActions.resetPage());
                navigate("../courses", { replace: true });
              }, 500);
            }}
          >
            Go to Courses
          </ButtonComp>
        </StackComp>
      </ErrorBoundary>
    </StackComp>
  );
};

export default CompleteForm;
