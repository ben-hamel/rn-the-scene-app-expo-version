import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UsernameScreen } from "../screens";

const Stack = createStackNavigator();

export const UsernameStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Username" component={UsernameScreen} />
    </Stack.Navigator>
  );
};
