import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  todoMobileNav: {
    width: "100%",
    position: "absolute",
    top: 50,
    left: 0,
    zIndex: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f39224",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuText: {
    color: "white",
    marginLeft: 5,
  },
  icon: {
    marginLeft: 5,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "white",
  },
});

export default styles;
