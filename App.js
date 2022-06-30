// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationRouter } from "./navigation/NavigationRouter";
// import { AuthenticatedUserProvider } from "./contexts";
import { AuthenticatedUserProvider } from "./contexts";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <NavigationRouter />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
}

export default App;
