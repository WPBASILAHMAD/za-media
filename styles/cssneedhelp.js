import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 40,
    margin: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",

    borderRadius: 10,
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 20,
    fontSize: 18,
    color: "gray",
    textAlign: "center",
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
  backToLogin: {
    color: "gray",
    textAlign: "center",
  },
  loginLink: {
    color: "#f39324",
    textDecorationLine: "underline",
  },
});

export default styles;
