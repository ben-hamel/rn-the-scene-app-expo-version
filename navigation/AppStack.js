import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";

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
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="home" component={HomeScreen} />
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
  const { colors } = useTheme();
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "TestScreen") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="TestScreen" component={TestScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
