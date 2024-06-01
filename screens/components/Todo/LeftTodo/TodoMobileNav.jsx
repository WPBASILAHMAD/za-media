import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { logActivity, saveData } from "../../../../services/http";
import { getCurrentTimestamp, getFilterTodos, getTodayDate } from "../../../../services/helper";
import { getUserID } from "../../../../services/auth";
import { addNewList, setLoading } from "../../../../slices/todaSlice";
import styles from "../../../../styles/cssTodo";
export default function TodoMobileNav() {
  const { allTodos, allLists, allListsTodos, sharedLists, selectedList } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();
  const [ShowAddList, setShowAddList] = useState(false);
  const [ListName, setListName] = useState("");
  const user_id = getUserID();

  const sortedAllLists = [...allLists].sort((a, b) => {
    if (a.list_id === "default") return -1;
    if (b.list_id === "default") return 1;
    return a.list_title.localeCompare(b.list_title);
  });

  const sortedSharedLists = [...sharedLists].sort((a, b) =>
    a.list_title.localeCompare(b.list_title)
  );

  const handleListAdd = async () => {
    if (ListName === "") return;

    try {
      dispatch(setLoading(true));
      const timeStamp = getCurrentTimestamp();
      const PK = `LISTS#`;
      const SK = `USER#${user_id}#${timeStamp}`;
      const item_data = {
        list_id: timeStamp,
        list_title: ListName,
        list_shared_with: [],
        list_date_created: getTodayDate(),
      };
      const table_name = "ZM_TODO";
      const { data: new_list } = await saveData(PK, SK, item_data, table_name);

      dispatch(addNewList(new_list));
      dispatch(setLoading(false));

      const log_txt = `${ListName} is created`;
      await logActivity("todo", log_txt);

      setListName("");
    } catch (error) {
      dispatch(setLoading(false));
      // toast.error(error.message);
    }
  };

  return (
    <View style={styles.todoMobileNav}>
      <View style={styles.menuItem}>
        {/* <Icon name="list" size={20} color="white" /> */}
        <Text style={styles.menuText}>To Do List</Text>
        {/* Render your FilterNav components here */}
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>My Lists</Text>
        <Icon
          name="plus"
          size={20}
          color="white"
          onPress={() => setShowAddList(!ShowAddList)}
          style={styles.icon}
        />
        {ShowAddList && (
          <View style={styles.flexRow}>
            <Input
              style={styles.input}
              onChangeText={(text) => setListName(text)}
              value={ListName}
              placeholder="Enter Name"
            />
            <Button title="Add" onPress={handleListAdd} />
          </View>
        )}
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>Shared with Me</Text>
      </View>
    </View>
  );
}
