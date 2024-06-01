import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, setAddNewTask, setLoading, updateTodo } from "../../../../slices/todaSlice";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getCurrentTimestamp, getFormattedDate, getTodayDate } from "../../../../services/helper";
import { getUserID, getUserName } from "../../../../services/auth";
import { logActivity, saveData } from "../../../../services/http";

export default function AddNewTodo({ todo, onCancel }) {
  const { addNewTask, selectedList } = useSelector((state) => state.todos);
  const [dueDate, setDueDate] = useState(getTodayDate());
  const [task, setTask] = useState("");
  const [IsStarred, setIsStarred] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const dispatch = useDispatch();

  const isASharedList = selectedList.hasOwnProperty("list_shared_by");

  useEffect(() => {
    if (todo && todo.title) {
      setCurrentTodo(todo);
      if (todo.due_date) {
        setDueDate(todo.due_date);
      }
      setTask(todo.title || "");
      setIsStarred(todo.starred || false);
    } else {
      resetForm();
    }
  }, [todo]);

  const user_id = getUserID();
  const user_name = getUserName();
  let log_txt = "";

  const handleNewTask = async () => {
    try {
      if (!task) return;

      dispatch(setLoading(true));

      let resp;
      if (currentTodo.title) {
        // Exclude PK and SK properties using destructuring
        const { PK, SK, ...rest } = currentTodo;
        const item_data = {
          ...rest,
          title: task,
          due_date: getFormattedDate(new Date(dueDate)),
          starred: IsStarred,
        };
        resp = await saveData(PK, SK, item_data, "ZM_TODO");
        Alert.alert("Success", "Task is updated successfully");
        dispatch(updateTodo(resp.data));

        log_txt = `A task is updated in ${selectedList.list_title} list`;
      } else {
        const timeStamp = getCurrentTimestamp();
        const list_user_id = isASharedList ? selectedList.list_shared_by : user_id;
        const PK = `TODOS#`,
          SK = `USER#${list_user_id}#${selectedList.list_id}#${timeStamp}`,
          item_data = {
            id: timeStamp,
            todo_list_id: selectedList.list_id,
            title: task,
            status: "process",
            badge: "Process",
            badgeclass: "danger",
            date: getTodayDate(),
            due_date: getFormattedDate(new Date(dueDate)),
            starred: IsStarred,
            user: { user_id, user_name },
          };
        resp = await saveData(PK, SK, item_data, "ZM_TODO");
        dispatch(addNewTodo(resp.data));

        Alert.alert("Success", "Task is added successfully");
        log_txt = `A task is created in ${selectedList.list_title} list`;
      }

      dispatch(setLoading(false));
      await logActivity("todo", log_txt);
      resetForm();
    } catch (e) {
      Alert.alert("Error", e.message);
      dispatch(setLoading(false));
    }
  };

  const handleTaskCancel = () => {
    resetForm();
    dispatch(setAddNewTask(false));
    if (onCancel) {
      onCancel(); // Call the parent reset function
    }
  };

  const resetForm = () => {
    setDueDate(getTodayDate());
    setTask("");
    setIsStarred(false);
    setCurrentTodo({});
  };

  return (
    <View style={styles.container}>
      {addNewTask && (
        <View style={styles.newTaskWrapper}>
          <TextInput
            style={styles.textInput}
            value={task}
            maxLength={400}
            onChangeText={setTask}
            placeholder="Enter new task here..."
            multiline
          />
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Due Date</Text>
            <TextInput
              style={styles.dateInput}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
          <TouchableOpacity onPress={() => setIsStarred(!IsStarred)} style={styles.starIcon}>
            <Text style={[styles.starText, { color: IsStarred ? "orange" : "black" }]}>★</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={handleTaskCancel} color="red" />
            <Button
              title={currentTodo.title ? "Update" : "Add"}
              onPress={handleNewTask}
              color="green"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "black",
    width: "100%",
  },
  newTaskWrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  textInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateLabel: {
    marginRight: 10,
  },
  dateInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  starIcon: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  starText: {
    fontSize: 24,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
