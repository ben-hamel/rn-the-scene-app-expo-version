import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationRouter } from "./navigation/NavigationRouter";
import { AuthUserProvider } from "@firebase/auth";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthUserProvider>
      <SafeAreaProvider>
        <NavigationRouter />
      </SafeAreaProvider>
    </AuthUserProvider>
  );
}

export default App;
