// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens";
import { LoginScreen } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationRouter } from "./navigation/NavigationRouter";
// import { AuthenticatedUserProvider } from "./contexts";
import { AuthenticatedUserProvider } from "./contexts";

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <NavigationRouter />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
