import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const createCourseStepperSlice = createSlice({
  name: "createCourseStepper",
  initialState,
  reducers: {
    setPage: (state, action) => {
      return action.payload;
    },
    resetPage: (state) => {
      return 1;
    },
  },
});

export const createCourseStepperActions = createCourseStepperSlice.actions;
export const createCourseStepperReducer = createCourseStepperSlice.reducer;
