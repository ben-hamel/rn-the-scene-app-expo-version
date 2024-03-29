import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { AuthStack } from "./AuthStack.js";
import { AppStack } from "./AppStack";
import { useColorScheme } from "react-native";
import { LoadingScreen } from "../screens";
import { useAuth } from "../firebase/auth.js";

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

  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyTheme}>
      {authUser ? (
        <AppStack testId="app-stack" />
      ) : (
        <AuthStack testId="auth-stack" />
      )}
    </NavigationContainer>
  );
};
