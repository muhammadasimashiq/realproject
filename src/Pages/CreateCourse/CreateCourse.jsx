import React from "react";
import * as Steps from "./Steps/";
import { useSelector } from "react-redux";

const CreateCourse = () => {
  const page = useSelector((state) => state.createCourseStepper);
  const [hasUnits, setHasUnits] = React.useState(false);

  return (
    <React.Fragment>
      {(page === 1 && (
        <Steps.ConfigureCourse
          hasUnits={hasUnits}
          courseHasUnits={(e) => setHasUnits(e)}
          getHasUnits={(e) => setHasUnits(e)}
        />
      )) ||
        (hasUnits
          ? (page === 2 && <Steps.AddUnits />) ||
            (page === 3 && <Steps.AddChaptersWithUnits />)
          : page === 2 && <Steps.AddChaptersWithoutUnits />) ||
        (page === 4 && <Steps.AddSnacks />) ||
        (page === 5 && <Steps.AddLearningObjectives />) ||
        (page === 6 && <Steps.AddSnackFlashCards />) || <Steps.CompleteForm />}
    </React.Fragment>
  );
};

export default CreateCourse;

/**
 * 
 (page === 4 && <Steps.AddSnacks />) ||
            (page === 5 && <Steps.AddLearningObjectives />) ||
            (page === 6 && <Steps.AddSnackFlashCards />)
 */
