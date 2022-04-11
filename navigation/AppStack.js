import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, TestScreen, TestScreen2, ProfileScreen } from "../screens";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="TestScreen2" component={TestScreen2} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
