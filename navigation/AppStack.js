import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  TestScreen,
  ProfileScreen,
  CategoryDetailScreen,
  UserDetailScreen,
} from "../screens";

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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
      />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>
  );
};
