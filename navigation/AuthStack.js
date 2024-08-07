import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  WelcomeScreen,
  EmailScreen,
  PasswordScreen,
  UsernameScreen,
} from "../screens";

const Stack = createStackNavigator();

export const AuthStack = () => {
  const headerOptions = {
    headerShown: true,
    headerTitle: "Create account",
    headerBackTitleVisible: false,
  };
  return (
    <Stack.Navigator
      initialRouteName={"Welcome"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          ...headerOptions,
          headerTitle: "Log in",
        }}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Username"
        component={UsernameScreen}
        options={{
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
};
