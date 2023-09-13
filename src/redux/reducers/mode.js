import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode: (state, payload) => {
      state.mode = payload.payload;
    },
  },
});

export const modeActions = modeSlice.actions;
export const modeReducer = modeSlice.reducer;
