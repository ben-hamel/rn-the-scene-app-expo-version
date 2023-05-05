import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack.js";
import { AppStack } from "./AppStack";
import { useColorScheme } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { UserContext } from "../contexts/context";

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
  const scheme = useColorScheme();

  const { user } = useContext(UserContext);

  return (
    <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
