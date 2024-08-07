import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthTestScreen } from "../screens";

const Stack = createStackNavigator();

export const TestStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Welcome"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={AuthTestScreen} />
    </Stack.Navigator>
  );
};
