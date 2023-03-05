import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  HomeScreen,
  TestScreen,
  ProfileScreen,
  CategoryDetailScreen,
  UserDetailScreen,
} from "../screens";

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/* <HomeStack.Screen name="TestScreen" component={TestScreen} /> */}
      {/* <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
      <HomeStack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
      />
      <HomeStack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </HomeStack.Navigator>
  );
}

export const AppStack = () => {
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   <Stack.Screen name="Home" component={HomeScreen} />
    //   <Stack.Screen name="TestScreen" component={TestScreen} />
    //   <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    //   <Stack.Screen
    //     name="CategoryDetailScreen"
    //     component={CategoryDetailScreen}
    //   />
    //   <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    // </Stack.Navigator>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="TestScreen" component={TestScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
