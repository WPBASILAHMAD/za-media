import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import LeftTodo from "./LeftTodo";
// import RightTodo from "./RightTodo";
// import CenterTodo from "./CenterTodo";
import { getUserID } from "../../../services/auth";
import { fetchAllLists, fetchAllTodosForAllLists } from "../../../slices/todaSlice";
import TodoMobileNav from "./LeftTodo/TodoMobileNav";
import NavigationBar from "../../NavigationBar";
import CenterTodo from "./CenterTodo/NewTodo";
import MaskTodo from "./CenterTodo/MaskTodo";
export default function ToDoContainer() {
  const dispatch = useDispatch();
  const { selectedList } = useSelector((state) => state.todos);
  const user_id = getUserID();
  // const wrapper = ConfigDB.settings.sidebar.type;

  useEffect(() => {
    dispatch(fetchAllLists());
    dispatch(fetchAllTodosForAllLists());
  }, [dispatch]);

  // console.log(wrapper);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NavigationBar />
      <TodoMobileNav />
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* {wrapper === "compact-wrapper" ? "" : <LeftTodo />} */}
        {/* <LeftTodo /> */}
        {/* <CenterTodo /> */}
        <MaskTodo />
        {/* <RightTodo /> */}
      </View>
    </View>
  );
}
