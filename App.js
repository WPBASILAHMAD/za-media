// App.js
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "./Layout";
import store from "./store";

function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Layout />
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
