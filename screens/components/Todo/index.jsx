import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import LeftTodo from "./LeftTodo";
// import RightTodo from "./RightTodo";
// import CenterTodo from "./CenterTodo";
import { getUserID } from "../../../services/auth";
import { fetchAllLists, fetchAllTodosForAllLists } from "../../../slices/todoSlice";
import TodoMobileNav from "./LeftTodo/TodoMobileNav";
import NavigationBar from "../../NavigationBar";
import CenterTodo from "./CenterTodo/NewTodo";
import MaskTodo from "./CenterTodo/MaskTodo";
import Footer from "../Footer/Footer";
export default function ToDoContainer() {
  const dispatch = useDispatch();
  const { selectedList } = useSelector((state) => state.todos);
  const user_id = getUserID();

  useEffect(() => {
    dispatch(fetchAllLists());
    dispatch(fetchAllTodosForAllLists());
  }, [dispatch]);

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
      <Footer />
    </View>
  );
}
