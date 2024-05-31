// NavigationBar.js
import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Provider } from "react-native-paper";
import { getProfileImageByUser } from "../services/helper";
import { logout } from "../slices/authSlice";

export default function NavigationBar() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
    setVisible(false);
  };
  const handlePress = () => {
    navigation.navigate("Todo"); // Navigate to the Todo index screen
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={28} color="orange" />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="comment-text-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="email-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={handlePress}>
            <Icon name="clipboard-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="bell-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="calendar-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="image-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="account-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity style={styles.iconContainer} onPress={openMenu}>
                <Image source={{ uri: getProfileImageByUser(user) }} style={styles.profileImage} />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => {}} title="Edit Profile" />
            <Menu.Item onPress={() => {}} title="Social Media" />
            <Menu.Item onPress={() => {}} title="Users" />
            <Menu.Item onPress={() => {}} title="Settings" />
            <Menu.Item onPress={handleLogout} title="Log out" />
          </Menu>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#333",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
