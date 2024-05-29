// slices/appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    email: "",
    isAuthenticated: false,
  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = appSlice.actions;

export default appSlice.reducer;
