import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: "false",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLogInHandler: (state, payload) => {
      state.isLoggedIn = payload.payload;
      localStorage.setItem("auth", state.isLoggedIn);
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
