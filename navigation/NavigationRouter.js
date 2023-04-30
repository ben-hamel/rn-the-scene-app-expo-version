import React, { useContext, useEffect } from "react";
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

      // rework the code to be in AuthContext: https://devpress.csdn.net/react/62eb6826648466712833a0b6.html
      // https://firebase.google.com/docs/auth/web/manage-users (Manage Users in Firebase)
      // https://firebase.google.com/docs/auth/users (Get User Data)
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  //   if (isLoading) {
  //     return <LoadingIndicator />;
  //   }

  return (
    <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
