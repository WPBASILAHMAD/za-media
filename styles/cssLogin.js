// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 20,
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 20,
    fontSize: 18,
    color: "gray",
    textAlign: "center",
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
    marginLeft: 10,
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
    textDecorationLine: "underline",
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

export default styles;
