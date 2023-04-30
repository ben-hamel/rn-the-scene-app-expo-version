import React, { useContext, useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import { AuthenticatedUserContext } from "../contexts";

import { AuthStack } from "./AuthStack.js";
import { AppStack } from "./AppStack";

import { useColorScheme } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

import { auth } from "../config/firebase.js";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6a5acd",
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#6a5acd",
    secondary: "#6a5acd",
  },
};

export const NavigationRouter = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  // const [isLoading, setIsLoading] = useState(true);
  const scheme = useColorScheme();

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is signed in");
        setUser(user);
      } else {
        console.log("user is signed out");
        setUser(null);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
