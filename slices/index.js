// slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import authReducer from "./authSlice";
import todoReducer from "./todoSlice";
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todos: todoReducer,
});

export default rootReducer;
