// Layout.js
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import NeedHelpScreen from "./screens/NeedHelp";
import ToDoContainer from "./screens/components/Todo";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f39224",
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Need Help"
        component={NeedHelpScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Todo"
        component={ToDoContainer}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
