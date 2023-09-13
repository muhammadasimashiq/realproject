import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "./reducers/mode";
import { authReducer } from "./reducers/auth";
import { createCourseReducer } from "./reducers/createCourse";
import { createCourseStepperReducer } from "./reducers/createCourseStepper";
const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer,
    createCourse: createCourseReducer,
    createCourseStepper: createCourseStepperReducer,
  },
});

export default store;
