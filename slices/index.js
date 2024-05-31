// slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import authReducer from "./authSlice";
import todaSlice from "./todaSlice";
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todos: todaSlice,
});

export default rootReducer;
