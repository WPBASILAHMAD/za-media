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
    fontSize: 16,
  },
  icon: {
    marginLeft: 5,
  },
  dropdown: {
    position: "absolute",
    width: "15%",
    top: 40,
    left: 200,
    right: 0,
    textDecorationLine: "none",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  addListContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default styles;
