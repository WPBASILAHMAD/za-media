import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AddNewTodo from "./NewTodo"; // Adjust the import path as necessary

const MaskTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false); // New state to control AddNewTodo visibility

  const addTask = () => {
    setIsAddingTask(true); // Show AddNewTodo component
  };

  const handleAddNewTask = (task) => {
    setTasks([...tasks, { id: Date.now(), title: task, dueDate: selectedDate }]);
    setIsAddingTask(false); // Hide AddNewTodo component
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.title}</Text>
      <Text style={styles.dueDateText}>Due: {item.dueDate.toLocaleDateString()}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>To Do (Private)</Text>
        {!isAddingTask && (
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button} onPress={addTask}>
              <Text style={styles.buttonText}>Add new task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!isAddingTask && (
        <>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.taskList}
          />
        </>
      )}
      {isAddingTask && (
        <AddNewTodo onCancel={() => setIsAddingTask(false)} onSave={handleAddNewTask} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    top: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
  },
  inputContainer: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#f39224",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  dueDateText: {
    fontSize: 14,
    color: "gray",
  },
  deleteButton: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});

export default MaskTodo;
