import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { AuthStack } from "./AuthStack.js";
import { AppStack } from "./AppStack";
import { TestStack } from "./TestStack";
import { useColorScheme } from "react-native";
import { LoadingScreen } from "../screens";
import { useAuth } from "../firebase/auth.js";
import Constants from "expo-constants";

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

  const inTestMode =
    Constants.expoConfig.extra.testMode === "true" &&
    process.env.NODE_ENV === "development";

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (inTestMode) {
    return (
      <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyTheme}>
        <TestStack />
      </NavigationContainer>
    );
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
