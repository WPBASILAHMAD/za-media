// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import styles from "./../styles/cssLogin"; // Adjust the path if necessary
import Checkbox from "expo-checkbox";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  const handleLogin = () => {
    dispatch(login({ user_email: email, user_password: password }))
      .unwrap()
      .then(() => {
        navigation.navigate("Dashboard");
      })
      .catch((err) => {
        Alert.alert("Login Error", err);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/office-photo-for-login.jpg")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={require("../assets/zamedia_logo.png")} style={styles.logo} />
          {/* <Text style={styles.welcomeText}>Welcome to the za:media World!</Text> */}
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
          </View>

          <View style={styles.inlineContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox value={rememberMe} onValueChange={setRememberMe} />
              <Text style={styles.checkboxLabel}>Mujhe Yaad Rakho</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("NeedHelp")}>
              <Text style={styles.needHelp}>Need help?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Explore za:media now!"}
            </Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity>
            <Text style={styles.createAccount}>Create your account now.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
