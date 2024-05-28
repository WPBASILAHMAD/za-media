// screens/DashboardScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavigationBar from "./NavigationBar";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <NavigationBar />
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to the Dashboard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
