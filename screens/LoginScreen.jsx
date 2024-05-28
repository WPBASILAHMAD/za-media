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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  const handleLogin = () => {
    navigation.navigate("Dashboard");
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

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="namaste@zamedia.de"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Your Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Khuda Jaane"
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
            <Text style={styles.checkboxLabel}>Mujhe Yaad Rakho</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.needHelp}>Need help?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    width: "500px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
    marginLeft: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 20,
    fontSize: 18,
    color: "gray",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    color: "black",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    backgroundColor: "#ededed",
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: "grey",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: "grey",
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    padding: 0,
    marginTop: "-20px",
  },
  showHideText: {
    color: "#f39324",
    fontSize: 16,
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
  checkboxLabel: {
    margin: 8,
  },
  needHelp: {
    color: "#f39324",
    textDecorationLine: "none",
    fontSize: 16,
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
