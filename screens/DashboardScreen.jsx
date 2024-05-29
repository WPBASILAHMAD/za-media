// screens/DashboardScreen.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import NavigationBar from "./NavigationBar";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <NavigationBar />
      <View style={styles.content}>
        <Image
          source={require("./../assets/zamedia_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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
    paddingHorizontal: 20, // Add some padding to avoid edge cuts
  },
  logo: {
    width: "80%", // Adjust the width as needed, here it takes 80% of the container's width
    height: undefined, // Let the height be adjusted based on the aspect ratio of the image
    aspectRatio: 1, // Adjust this if your logo is not square
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
