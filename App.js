// import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationRouter } from "./navigation/NavigationRouter";
import { UserContext } from "./contexts/context";
import { useUserData } from "./hooks/hooks";

const Stack = createNativeStackNavigator();

function App() {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <SafeAreaProvider>
        <NavigationRouter />
      </SafeAreaProvider>
    </UserContext.Provider>
  );
}

export default App;
