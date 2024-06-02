import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { fetchBrainDump, setStaffStuff } from "../../../../slices/todoSlice";
import { saveData, sendEmail } from "../../../../services/http";
import { getUserID, getUserName } from "../../../../services/auth";
// import { GetContentMoodReport } from "../../../../Emails";

const RightTodo = () => {
  const [BrainDump, setBrainDump] = useState("");
  const dispatch = useDispatch();
  const { staffStuff, brainDump } = useSelector((state) => state.todos);

  const user_id = getUserID();
  const user_name = getUserName();

  useEffect(() => {
    dispatch(fetchBrainDump());
    setBrainDump(brainDump);
  }, [dispatch, brainDump]);

  // Safely access mood, water, and food with default values
  const { mood, water, food = [] } = staffStuff;

  const moodOptions = [
    { value: 1, iconClass: "😠" },
    { value: 2, iconClass: "😢" },
    { value: 3, iconClass: "😐" },
    { value: 4, iconClass: "🙂" },
    { value: 5, iconClass: "🤓" },
    { value: 6, iconClass: "😊" },
    { value: 7, iconClass: "😂" },
  ];

  const handleMoodChange = async (selectedMood) => {
    dispatch(setStaffStuff({ mood: selectedMood }));

    if (selectedMood === 1 || selectedMood === 2) {
      const moodMessages = {
        1: "Astaghfirullah, No talking today",
        2: "Meh, I need coffee first",
      };
      const subject = `${user_name} mood is : ${moodMessages[selectedMood]}`;
      // const content = GetContentMoodReport(subject);

      try {
        await sendEmail(
          "qamar@zamedia.de, nitik@zamedia.de, ceo@najeebmedia.com",
          subject
          // content
        );
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Mood alert email sent successfully",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to send mood alert email",
        });
      }
    }
  };

  const foodItems = [
    { name: "tea", iconClass: "🍵" },
    { name: "cupcake", iconClass: "🧁" },
    { name: "apple", iconClass: "🍎" },
    { name: "fastfood", iconClass: "🍔" },
    { name: "banana", iconClass: "🍌" },
    { name: "sandwich", iconClass: "🥪" },
    { name: "grapes", iconClass: "🍇" },
  ];

  const handleFoodClick = (foodItemName) => {
    const isFoodSelected = food.includes(foodItemName);
    const updatedFood = isFoodSelected
      ? food.filter((item) => item !== foodItemName)
      : [...food, foodItemName];
    dispatch(setStaffStuff({ food: updatedFood }));
  };

  const handleWaterClick = (water) => {
    dispatch(setStaffStuff({ water }));
  };

  const handleBrainDumpChange = (text) => {
    setBrainDump(text);
  };

  const handleBrainDumpBlur = async () => {
    try {
      const pk = `TODOS#`;
      const sk = `BRAINDUMP#${user_id}`;
      const item_data = { brain_dump: BrainDump };
      const table_name = "ZM_TODO";
      await saveData(pk, sk, item_data, table_name);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>How Are You Feeling Now?</Text>
        <View style={styles.row}>
          {moodOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleMoodChange(option.value)}
              style={[styles.iconContainer, mood === option.value && styles.activeIconContainer]}
            >
              <Text style={styles.icon}>{option.iconClass}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Stay Hydrated, Water Matters!</Text>
        <View style={styles.row}>
          {[...Array(7)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleWaterClick(index + 1)}
              style={[styles.iconContainer, index < water && styles.activeIconContainer]}
            >
              <Text style={styles.icon}>🥤</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Food is Fuel. Eat On Time!</Text>
        <View style={styles.row}>
          {foodItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleFoodClick(item.name)}
              style={[styles.iconContainer, food.includes(item.name) && styles.activeIconContainer]}
            >
              <Text style={styles.icon}>{item.iconClass}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>
          <Text>Brain Dump, Don't Forget!</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          value={BrainDump}
          placeholder="Write Something"
          onBlur={handleBrainDumpBlur}
          onChangeText={handleBrainDumpChange}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  iconContainer: {
    padding: 8,
    margin: 4,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  activeIconContainer: {
    backgroundColor: "#f39224",
  },
  icon: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default RightTodo;
