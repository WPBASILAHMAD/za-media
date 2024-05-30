// screens/NeedHelpScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../styles/cssneedhelp";

export default function NeedHelpScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleHelp = () => {
    // Handle help logic here
    // For example, sending a password reset email
  };

  return (
    <ImageBackground
      source={require("../assets/office-photo-for-login.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../assets/zamedia_logo.png")} style={styles.logo} />
        <Text style={styles.title}>Bhula Diya?</Text>
        <Text style={styles.instructions}>Enter your email to reset your password</Text>

        <TextInput
          style={styles.input}
          placeholder="namaste@zamedia.de"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleHelp}>
          <Text style={styles.buttonText}>Help me now!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backToLogin}>
            Yaad Aane Laga Hai! Back to <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
