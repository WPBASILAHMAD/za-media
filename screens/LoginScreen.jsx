// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <ImageBackground
      source={require("../assets/office-photo-for-login.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../assets/zamedia_logo.png")} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to the za:media World!</Text>
        <Text style={styles.instructions}>Use your Email and Password to explore it</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
          />
          <TouchableOpacity onPress={toggleSecureText} style={styles.showHideButton}>
            <Text style={styles.showHideText}>{secureText ? "dekho na" : "hide"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox value={rememberMe} onValueChange={setRememberMe} />
            <Text style={styles.label}>Mujhe Yaad Rakho</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.needHelp}>Need help?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore za:media now!</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.createAccount}>Create your account now.</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 40,
    margin: 70,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: "center",
    marginBottom: 10,
  },
  instructions: {
    // textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  showHideButton: {
    position: "absolute",
    right: 10,

    padding: 0,
    marginTop: "-20px",
  },
  showHideText: {
    color: "#f39324",
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 8,
  },
  needHelp: {
    color: "#f39324",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#f39324",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createAccount: {
    color: "#f39324",
    textAlign: "center",
  },
});
