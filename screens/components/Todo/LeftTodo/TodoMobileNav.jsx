import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Assuming you want to use Feather icons
import { logActivity, saveData } from "../../../../services/http";
import { getCurrentTimestamp, getFilterTodos, getTodayDate } from "../../../../services/helper";
import { getUserID } from "../../../../services/auth";
// import FilterNav from "./FilterNav";
// import MyLists from "./MyLists";
// import SharedListsWithMe from "./SharedLists";
import { addNewList, setLoading } from "../../../../slices/todaSlice";
// import { toast } from "react-toastify";

export default function TodoMobileNav() {
  const { allTodos, allLists, allListsTodos, sharedLists, selectedList } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();
  const [ShowAddList, setShowAddList] = useState(false);
  const [ListName, setListName] = useState("");
  const user_id = getUserID();

  // Sort the lists alphabetically by list_title
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
      //   toast.error(error.message);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ marginRight: 10 }}>
        <Text>To Do List</Text>
      </View>
      <View style={{ marginRight: 10 }}>
        <Text>My Lists</Text>
        <Icon
          name="plus"
          size={20}
          onPress={() => setShowAddList(!ShowAddList)}
          style={{ color: "orange" }}
        />
        {ShowAddList === true && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              style={{ flex: 1 }}
              onChangeText={(text) => setListName(text)}
              value={ListName}
              placeholder="Enter Name"
            />
            <Button title="Add" onPress={handleListAdd} />
          </View>
        )}
      </View>
      <View>
        <Text>Shared with Me</Text>
      </View>
    </View>
  );
}
